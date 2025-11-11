import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import GlobalCta from '@/components/GlobalCta';
import { supabase } from '@/integrations/supabase/client';
import { showError } from '@/utils/toast';

interface Post {
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
}

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('slug, title, featured_image, excerpt, published_at, category:categories(name)')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) {
        showError("Erreur lors du chargement des articles : " + error.message);
      } else {
        const mapped = (data || []).map((p: any) => ({
          slug: p.slug,
          title: p.title,
          category: p.category?.name ?? 'Non classé',
          date: p.published_at ? new Date(p.published_at).toLocaleDateString('fr-FR') : '',
          image: p.featured_image || '/125484.webp',
          excerpt: p.excerpt || ''
        }));
        setPosts(mapped);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-dark-black text-white">
      <Header />
      <main>
        <section className="py-20 md:py-32 text-center bg-dark-black">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-4">Notre Blog</h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Découvrez nos articles, conseils et actualités sur le monde du digital, du design et du développement.
            </p>
            <p className="text-lg text-gray-400 mt-4">
              <Link to="/" className="hover:text-lime-accent">Accueil</Link> / <span className="text-white">Blog</span>
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center text-gray-400 flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                Chargement des articles...
              </div>
            ) : posts.length === 0 ? (
              <p className="text-gray-400 text-center">Aucun article de blog publié pour le moment.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Card key={post.slug} className="bg-dark-gray border-gray-800 overflow-hidden group text-left rounded-2xl flex flex-col">
                    <div className="relative overflow-hidden">
                      <Link to={`/blog/${post.slug}`}>
                        <img src={post.image} alt={post.title} className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300" />
                      </Link>
                      <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Link to={`/blog/${post.slug}`} className="bg-lime-accent text-dark-black rounded-full p-3 transform group-hover:scale-110 transition-transform">
                          <ArrowUpRight className="h-6 w-6" />
                        </Link>
                      </div>
                    </div>
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                        <Badge variant="outline" className="border-gray-600 text-gray-300">{post.category}</Badge>
                        <span>{post.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 flex-grow">
                        <Link to={`/blog/${post.slug}`} className="hover:text-lime-accent transition-colors">{post.title}</Link>
                      </h3>
                      <p className="text-gray-400 mb-4">{post.excerpt}</p>
                      <Link to={`/blog/${post.slug}`} className="font-semibold text-lime-accent hover:underline self-start">
                        Lire la suite
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        <GlobalCta />
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;