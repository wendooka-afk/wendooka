import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { showError } from '@/utils/toast';
import { blogPostsData } from '@/data/servicesData';
import { Button } from '@/components/ui/button';

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
    document.title = "Blog & conseils pour réussir vos projets web | Wendooka";
    const metaDescription = document.querySelector('meta[name="description"]');
    const content = "Articles, guides et conseils pour réussir vos projets web, digitaux et marketing.";
    if (metaDescription) {
      metaDescription.setAttribute("content", content);
    }

    const fetchPosts = async () => {
      setLoading(true);

      // Articles statiques (source principale)
      const staticSlugs = new Set(blogPostsData.map(p => p.slug));
      const staticPosts: Post[] = blogPostsData.map(p => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        date: new Date(p.published_at).toLocaleDateString('fr-FR'),
        image: p.featured_image,
        excerpt: p.excerpt
      }));

      // Articles Supabase (uniquement ceux qui ne sont pas déjà en statique)
      const { data } = await supabase
        .from('blog_posts')
        .select('slug, title, featured_image, excerpt, published_at, category:categories(name)')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

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

      // Fusionner : statiques d'abord, puis les articles Supabase supplémentaires
      setPosts([...staticPosts, ...dbPosts]);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-dark-black text-white">
      <Header />
      <main>
        {/* Updated Hero Section */}
        <section className="relative py-24 md:py-40 text-center bg-cover bg-center" style={{ backgroundImage: `url('/5572.webp')` }}>
          <div className="absolute inset-0 bg-dark-black/85 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6 max-w-5xl mx-auto">
              Conseils et expertises pour <span className="text-lime-accent">réussir vos projets digitaux</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 font-light">
              Découvrez nos articles dédiés à la création de sites web, au développement, au design et au marketing digital, pour prendre les bonnes décisions et éviter les erreurs coûteuses.
            </p>
            <div className="flex justify-center gap-2 text-sm text-gray-500">
              <Link to="/" className="hover:text-lime-accent transition-colors">Accueil</Link> / <span className="text-white">Blog</span>
            </div>
          </div>
        </section>

        {/* Business Intro Section */}
        <section className="py-12 bg-white text-dark-black border-b border-gray-100">
          <div className="container mx-auto px-4">
            <p className="text-xl md:text-2xl text-center max-w-4xl mx-auto text-gray-600 leading-relaxed font-medium">
              "Les articles publiés sur le blog Wendooka ont un objectif clair : vous aider à structurer votre projet digital, à comprendre les enjeux réels et à faire des choix éclairés avant d’investir."
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white text-dark-black">
          <div className="container mx-auto px-4">

            {/* Featured Section */}
            {!loading && posts.length > 0 && (
              <div className="mb-20">
                <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-10 border-l-4 border-lime-accent pl-4 text-dark-black">
                  Articles essentiels pour bien démarrer votre projet
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {posts.slice(0, 3).map((post) => (
                    <Card key={`featured-${post.slug}`} className="bg-gray-50 border-gray-100 overflow-hidden group text-left rounded-3xl flex flex-col hover:shadow-xl transition-all border shadow-sm">
                      <div className="relative overflow-hidden">
                        <Link to={`/blog/${post.slug}`}>
                          <img src={post.image} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                        </Link>
                      </div>
                      <CardContent className="p-6">
                        <Badge className="bg-lime-accent text-dark-black hover:bg-lime-accent mb-4 px-3 py-0.5 text-[10px] uppercase font-bold">
                          {post.category}
                        </Badge>
                        <h3 className="text-xl font-bold text-dark-black mb-3">
                          <Link to={`/blog/${post.slug}`} className="hover:text-lime-600 transition-colors line-clamp-2">{post.title}</Link>
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                        <Link to={`/blog/${post.slug}`} className="inline-flex items-center text-dark-black font-bold text-sm hover:gap-2 transition-all">
                          Lire l'article <ArrowUpRight className="ml-1 h-4 w-4 text-lime-600" />
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <hr className="mb-20 border-gray-100" />

            {/* Main Articles Grid */}
            <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-12 text-dark-black">
              Toutes nos expertises
            </h2>

            {loading ? (
              <div className="text-center text-gray-400 flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin mr-3 text-lime-accent" />
                <span className="text-dark-black">Chargement des articles...</span>
              </div>
            ) : posts.length === 0 ? (
              <p className="text-gray-400 text-center py-20">Aucun article de blog publié pour le moment.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {posts.map((post) => (
                  <div key={post.slug} className="group cursor-pointer">
                    <div className="mb-6 rounded-2xl overflow-hidden aspect-video relative">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-dark-black text-white hover:bg-dark-black py-1 px-3 rounded-full text-[10px] uppercase tracking-wider font-bold shadow-lg">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-2 font-mono">{post.date}</div>
                      <h3 className="text-2xl font-bold text-dark-black mb-3 leading-tight group-hover:text-lime-600 transition-colors">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 px-6 py-2.5 bg-dark-black text-white rounded-full text-sm font-bold hover:bg-lime-accent hover:text-dark-black transition-all">
                        Lire l'article
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Strategic Maillage Section */}
        <section className="py-20 md:py-32 bg-gray-50 text-dark-black border-t border-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">Nos expertises digitales</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
              Ces articles s’inscrivent dans une approche globale de performance digitale, en lien direct avec nos services.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {[
                { name: "Création de sites web", path: "/services/creation-sites-web" },
                { name: "Développement web", path: "/services/developpement-web" },
                { name: "UI/UX Design", path: "/services/ui-ux-design" },
                { name: "Design graphique", path: "/services/design-graphique" },
                { name: "Marketing digital", path: "/services/marketing-digital" }
              ].map((service) => (
                <Link
                  key={service.name}
                  to={service.path}
                  className="bg-white border border-gray-200 px-8 py-5 rounded-2xl font-bold shadow-sm hover:shadow-md hover:border-lime-accent hover:text-lime-600 transition-all text-sm md:text-base"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Recadrage */}
        <section className="py-20 bg-lime-accent text-dark-black">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">Vous préparez un projet digital ?</h2>
            <p className="text-xl mb-10 max-w-3xl mx-auto font-medium">
              Vous avez lu nos articles et souhaitez passer à l’action ? Échangeons sur votre projet et définissons ensemble une solution digitale performante et adaptée à vos objectifs.
            </p>
            <Button asChild variant="default" size="lg" className="bg-dark-black text-white hover:bg-gray-900 rounded-full px-12 py-8 text-lg uppercase tracking-wider font-bold shadow-xl">
              <Link to="/contact">Obtenir un devis gratuit</Link>
            </Button>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;