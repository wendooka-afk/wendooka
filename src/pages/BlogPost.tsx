import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, User, Tag, Loader2 } from 'lucide-react';
import GlobalCta from '@/components/GlobalCta';
import { supabase } from '@/integrations/supabase/client';
import { showError } from '@/utils/toast';

interface Post {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  image: string;
  content: string; // Content is now a string from Supabase
}

const BlogPostPage: React.FC = () => {
  const { postSlug } = useParams<{ postSlug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postSlug) {
      setError("Slug d'article manquant.");
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', postSlug)
        .eq('status', 'published')
        .single();

      if (error) {
        console.error("Erreur lors du chargement de l'article :", error);
        setError("Article non trouvé ou non publié.");
        setPost(null);
      } else if (data) {
        setPost(data);
      } else {
        setError("Article non trouvé ou non publié.");
        setPost(null);
      }
      setLoading(false);
    };

    fetchPost();
  }, [postSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-black text-white">
        <Loader2 className="h-8 w-8 animate-spin text-lime-accent" />
        <span className="ml-2">Chargement de l'article...</span>
      </div>
    );
  }

  if (error) {
    return <Navigate to="/404" replace />;
  }

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="bg-dark-black text-white">
      <Header />
      <main>
        <section className="py-20 md:py-32 bg-dark-gray">
          <div className="container mx-auto px-4 text-center">
            <p className="text-lg text-gray-400 mb-8">
              <Link to="/" className="hover:text-lime-accent">Accueil</Link> / <Link to="/blog" className="hover:text-lime-accent">Blog</Link> / <span className="text-white truncate">{post.title}</span>
            </p>
            <h1 className="text-3xl md:text-5xl font-bold font-poppins mb-6 max-w-4xl mx-auto">{post.title}</h1>
            <div className="flex justify-center items-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-lime-accent" />
                <span>{post.author || 'Inconnu'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-lime-accent" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-lime-accent" />
                <span>{post.category || 'Non classé'}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            {post.image && <img src={post.image} alt={post.title} className="rounded-2xl w-full h-auto object-cover mb-12" />}
            <div className="prose prose-invert prose-lg max-w-none prose-h3:font-poppins prose-h3:text-lime-accent prose-a:text-lime-accent hover:prose-a:underline">
              {/* Render HTML content directly */}
              {post.content && <div dangerouslySetInnerHTML={{ __html: post.content }} />}
              {!post.content && <p className="text-gray-400">Aucun contenu pour cet article.</p>}
            </div>
          </div>
        </section>

        <GlobalCta />
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;