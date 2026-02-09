import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlobalCta from '@/components/GlobalCta';
import { Loader2 } from 'lucide-react';
import { sanitizeHtml } from '@/lib/sanitize';

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string; // Assuming content is stored as a string for now
  seo_title?: string;
  meta_description?: string;
  canonical_url?: string;
}

const DynamicPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("Slug de page manquant.");
      setLoading(false);
      return;
    }

    const fetchPage = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published') // Only fetch published pages for public view
        .single();

      if (error) {
        setError("Page non trouvée ou non publiée.");
        setPage(null);
      } else if (data) {
        setPage(data);
      } else {
        setError("Page non trouvée ou non publiée.");
        setPage(null);
      }
      setLoading(false);
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-black text-white">
        <Loader2 className="h-8 w-8 animate-spin text-lime-accent" />
        <span className="ml-2">Chargement de la page...</span>
      </div>
    );
  }

  if (error) {
    return <Navigate to="/404" replace />;
  }

  if (!page) {
    return <Navigate to="/404" replace />;
  }

  // Set SEO meta tags
  useEffect(() => {
    document.title = page.seo_title || page.title;
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag && page.meta_description) {
      metaDescriptionTag.setAttribute('content', page.meta_description);
    } else if (page.meta_description) {
      const newMetaTag = document.createElement('meta');
      newMetaTag.name = 'description';
      newMetaTag.content = page.meta_description;
      document.head.appendChild(newMetaTag);
    }
    const canonicalLinkTag = document.querySelector('link[rel="canonical"]');
    if (canonicalLinkTag && page.canonical_url) {
      canonicalLinkTag.setAttribute('href', page.canonical_url);
    } else if (page.canonical_url) {
      const newLinkTag = document.createElement('link');
      newLinkTag.rel = 'canonical';
      newLinkTag.href = page.canonical_url;
      document.head.appendChild(newLinkTag);
    }
  }, [page]);

  return (
    <div className="bg-dark-black text-white">
      <Header />
      <main>
        <section className="py-20 md:py-32 text-center bg-dark-gray">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-4">{page.title}</h1>
            <p className="text-lg text-gray-400 mt-4">
              <Link to="/" className="hover:text-lime-accent">Accueil</Link> / <span className="text-white">{page.title}</span>
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl prose prose-invert prose-lg">
            {/* For now, content is plain text. Will be enhanced with WYSIWYG/Markdown later. */}
            {page.content && <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(page.content) }} />}
            {!page.content && <p className="text-gray-400">Aucun contenu pour cette page.</p>}
          </div>
        </section>
        <GlobalCta />
      </main>
      <Footer />
    </div>
  );
};

export default DynamicPage;