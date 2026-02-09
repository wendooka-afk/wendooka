import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { showError } from '@/utils/toast';
import { blogPostsData } from '@/data/servicesData';

interface Post {
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
}

const BlogSection: React.FC = () => {
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      setLoading(true);
      try {
        // Articles statiques (source principale, les 3 premiers)
        const staticSlugs = new Set(blogPostsData.map(p => p.slug));
        const staticPosts: Post[] = blogPostsData.slice(0, 3).map(p => ({
          slug: p.slug,
          title: p.title,
          category: p.category,
          date: new Date(p.published_at).toLocaleDateString('fr-FR'),
          image: p.featured_image,
          excerpt: p.excerpt
        }));

        // Compléter avec Supabase si nécessaire (articles non-statiques)
        const { data } = await supabase
          .from('blog_posts')
          .select('slug, title, featured_image, excerpt, published_at, category:categories(name)')
          .eq('status', 'published')
          .order('created_at', { ascending: false })
          .limit(3);

        let dbPosts: Post[] = [];
        if (data && data.length > 0) {
          dbPosts = data
            .filter((p: any) => !staticSlugs.has(p.slug))
            .map((p: any) => ({
              slug: p.slug,
              title: p.title,
              category: p.category?.name ?? 'Non classé',
              date: p.published_at ? new Date(p.published_at).toLocaleDateString('fr-FR') : '',
              image: p.featured_image || '/125484.webp',
              excerpt: p.excerpt || ''
            }));
        }

        setLatestPosts([...staticPosts, ...dbPosts].slice(0, 3));
      } catch {
        const mapped = blogPostsData.slice(0, 3).map(p => ({
          slug: p.slug,
          title: p.title,
          category: p.category,
          date: new Date(p.published_at).toLocaleDateString('fr-FR'),
          image: p.featured_image,
          excerpt: p.excerpt
        }));
        setLatestPosts(mapped);
      }
      setLoading(false);
    };

    fetchLatestPosts();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-dark-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-px bg-lime-accent"></div>
              <p className="font-semibold text-lime-accent">Actualités & Blog</p>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-poppins">
              Conseils et expertises pour <span className="text-lime-accent">réussir votre projet web</span>
            </h2>
          </div>
          <Button asChild className="mt-4 md:mt-0 rounded-full p-0 bg-lime-accent hover:bg-lime-accent/90">
            <Link to="/blog" className="flex items-center">
              <span className="pl-6 pr-4 py-3 text-dark-black font-bold">Voir tous les articles</span>
              <div className="bg-dark-black text-white rounded-full p-2 mr-1">
                <ArrowRight className="h-5 w-5" />
              </div>
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="text-center text-gray-400">Chargement des articles...</div>
        ) : latestPosts.length === 0 ? (
          <p className="text-gray-400 text-center">Aucun article de blog publié pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
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
  );
};

export default BlogSection;