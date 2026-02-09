import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, User, Tag, Loader2, Facebook, Twitter, Linkedin, Share2, Mail, Clock, ArrowUpRight, MessageSquare, Send } from 'lucide-react';
import GlobalCta from '@/components/GlobalCta';
import { supabase } from '@/integrations/supabase/client';
import { blogPostsData } from '@/data/servicesData';
import { teamData } from '@/data/team';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { sanitizeHtml } from '@/lib/sanitize';
import { Card, CardContent } from '@/components/ui/card';

interface Post {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  image: string;
  content: string;
}

const BlogPostPage: React.FC = () => {
  const { postSlug } = useParams<{ postSlug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  useEffect(() => {
    if (!postSlug) {
      setError("Slug d'article manquant.");
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      setLoading(true);
      setError(null);

      // Priorité 1 : chercher dans les articles statiques
      const mockPost = blogPostsData.find(p => p.slug === postSlug);

      if (mockPost) {
        setPost({
          slug: mockPost.slug,
          title: mockPost.title,
          content: (mockPost as any).content || '',
          author: (mockPost as any).author || 'Équipe Wendooka',
          image: mockPost.featured_image,
          date: new Date(mockPost.published_at).toLocaleDateString('fr-FR'),
          category: mockPost.category,
        });

        // Set SEO Meta
        const seoDesc = mockPost.seo_description || `Découvrez comment ${mockPost.title.toLowerCase()} et faire le bon choix pour votre projet web, sans erreurs coûteuses.`;
        document.title = `${mockPost.title} | Blog Wendooka`;
        const metaDescTag = document.querySelector('meta[name="description"]');
        if (metaDescTag) metaDescTag.setAttribute('content', seoDesc);

        setLoading(false);
        return;
      }

      // Priorité 2 : chercher dans Supabase
      const { data } = await supabase
        .from('blog_posts')
        .select('slug, title, content, author, featured_image, published_at, meta_description, excerpt, category:categories(name)')
        .eq('slug', postSlug)
        .eq('status', 'published')
        .single();

      if (data) {
        const p = data as any;
        setPost({
          slug: p.slug,
          title: p.title,
          content: p.content || '',
          author: p.author || 'Inconnu',
          image: p.featured_image || '',
          date: p.published_at ? new Date(p.published_at).toLocaleDateString('fr-FR') : '',
          category: p.category?.name ?? 'Non classé',
        });

        document.title = `${p.title} | Blog Wendooka`;
        const metaDescTag = document.querySelector('meta[name="description"]');
        if (metaDescTag) metaDescTag.setAttribute('content', p.meta_description || p.excerpt || '');
      } else {
        setError("Article non trouvé.");
        setPost(null);
      }

      setLoading(false);
    };

    fetchPost();
  }, [postSlug]);

  // Trouver le membre de l'équipe correspondant à l'auteur
  const authorMember = post ? teamData.find(m => m.name === post.author) : null;

  // Articles similaires (même catégorie, excluant l'article actuel)
  const similarPosts = post
    ? blogPostsData
        .filter(p => p.category === post.category && p.slug !== post.slug)
        .slice(0, 3)
    : [];

  // Si pas assez d'articles similaires, compléter avec d'autres articles
  const relatedPosts = similarPosts.length < 2 && post
    ? [
        ...similarPosts,
        ...blogPostsData
          .filter(p => p.slug !== post.slug && !similarPosts.find(sp => sp.slug === p.slug))
          .slice(0, 3 - similarPosts.length)
      ]
    : similarPosts;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pour l'instant, on affiche juste un message de succès
    setCommentSubmitted(true);
    setCommentName('');
    setCommentEmail('');
    setCommentText('');
    setTimeout(() => setCommentSubmitted(false), 5000);
  };

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
        {/* Hero Section with Background Image */}
        <section className="relative py-20 md:py-32 flex items-center bg-cover bg-center min-h-[50vh]" style={{ backgroundImage: `url('${post.image}')` }}>
          <div className="absolute inset-0 bg-dark-black/80 z-0"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <Badge variant="outline" className="mb-4 border-lime-accent text-lime-accent uppercase tracking-wider bg-black/50 backdrop-blur-sm">
              {post.category}
            </Badge>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-poppins mb-6 max-w-4xl mx-auto leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-6 text-gray-300 text-sm md:text-base">
              <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                {authorMember ? (
                  <img src={authorMember.image} alt={authorMember.name} className="h-6 w-6 rounded-full object-cover" />
                ) : (
                  <User className="h-4 w-4 text-lime-accent" />
                )}
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                <Calendar className="h-4 w-4 text-lime-accent" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                <Clock className="h-4 w-4 text-lime-accent" />
                <span>5 min de lecture</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content & Sidebar */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

              {/* Article Content */}
              <div className="lg:col-span-8">
                <div className="bg-dark-gray p-8 md:p-12 rounded-2xl border border-gray-800">
                  <div className="prose prose-invert prose-lg max-w-none prose-headings:font-poppins prose-headings:font-bold prose-h2:text-white prose-h2:mt-12 prose-h3:text-lime-accent prose-p:text-gray-300 prose-a:text-lime-accent hover:prose-a:text-white prose-a:transition-colors prose-strong:text-white prose-blockquote:border-l-lime-accent prose-blockquote:bg-black/20 prose-blockquote:p-4 prose-blockquote:not-italic prose-li:text-gray-300 prose-img:rounded-xl">
                    {post.content && <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }} />}
                    {!post.content && <p className="text-gray-400">Aucun contenu pour cet article.</p>}
                  </div>

                  {/* Strategic Final CTA */}
                  <div className="mt-16 p-8 md:p-10 bg-lime-accent text-dark-black rounded-3xl text-center">
                    <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-4">Discuter de mon projet web</h2>
                    <p className="text-lg mb-8 font-medium opacity-90">
                      Vous avez un projet en tête et souhaitez éviter les erreurs courantes ? Échangeons sur vos objectifs et définissons ensemble la solution la plus adaptée.
                    </p>
                    <Button asChild className="bg-dark-black text-white hover:bg-gray-900 rounded-full px-10 py-6 text-base font-bold uppercase tracking-wider">
                      <Link to="/contact">Démarrer la discussion</Link>
                    </Button>
                  </div>

                  {/* Article Footer (Tags & Share) */}
                  <div className="mt-12 pt-8 border-t border-gray-700">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Tag className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-400 mr-2">Tags:</span>
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="hover:bg-lime-accent hover:text-dark-black cursor-pointer transition-colors">Marketing</Badge>
                          <Badge variant="secondary" className="hover:bg-lime-accent hover:text-dark-black cursor-pointer transition-colors">Digital</Badge>
                          <Badge variant="secondary" className="hover:bg-lime-accent hover:text-dark-black cursor-pointer transition-colors">Business</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400 font-semibold">Partager :</span>
                        <Button size="icon" variant="ghost" className="hover:text-blue-500 hover:bg-transparent"><Facebook className="h-5 w-5" /></Button>
                        <Button size="icon" variant="ghost" className="hover:text-sky-400 hover:bg-transparent"><Twitter className="h-5 w-5" /></Button>
                        <Button size="icon" variant="ghost" className="hover:text-blue-700 hover:bg-transparent"><Linkedin className="h-5 w-5" /></Button>
                        <Button size="icon" variant="ghost" className="hover:text-lime-accent hover:bg-transparent"><Share2 className="h-5 w-5" /></Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Author Bio Section */}
                <div className="mt-8 bg-dark-gray p-8 md:p-10 rounded-2xl border border-gray-800">
                  <h3 className="text-xl font-bold font-poppins mb-6 flex items-center gap-3">
                    <User className="h-5 w-5 text-lime-accent" />
                    À propos de l'auteur
                  </h3>
                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    {authorMember ? (
                      <>
                        <img
                          src={authorMember.image}
                          alt={authorMember.name}
                          className="h-24 w-24 rounded-2xl object-cover border-2 border-lime-accent flex-shrink-0"
                        />
                        <div>
                          <h4 className="text-lg font-bold text-white mb-1">{authorMember.name}</h4>
                          <p className="text-lime-accent text-sm font-semibold mb-3">{authorMember.role}</p>
                          <p className="text-gray-400 leading-relaxed">{authorMember.bio}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="h-24 w-24 rounded-2xl bg-lime-accent/20 flex items-center justify-center border-2 border-lime-accent flex-shrink-0">
                          <User className="h-10 w-10 text-lime-accent" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-1">{post.author}</h4>
                          <p className="text-lime-accent text-sm font-semibold mb-3">Rédacteur</p>
                          <p className="text-gray-400 leading-relaxed">
                            Expert en stratégie digitale au sein de l'agence Wendooka, contribuant à partager les meilleures pratiques pour réussir vos projets web.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Comments Section */}
                <div className="mt-8 bg-dark-gray p-8 md:p-10 rounded-2xl border border-gray-800">
                  <h3 className="text-xl font-bold font-poppins mb-6 flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-lime-accent" />
                    Laisser un commentaire
                  </h3>
                  <p className="text-gray-400 mb-6 text-sm">
                    Votre adresse email ne sera pas publiée. Partagez votre avis ou posez vos questions sur cet article.
                  </p>

                  {commentSubmitted && (
                    <div className="mb-6 p-4 bg-lime-accent/10 border border-lime-accent/30 rounded-xl text-lime-accent text-sm font-medium">
                      Merci pour votre commentaire ! Il sera publié après modération.
                    </div>
                  )}

                  <form onSubmit={handleCommentSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="comment-name" className="block text-sm font-medium text-gray-300 mb-2">Nom *</label>
                        <Input
                          id="comment-name"
                          placeholder="Votre nom"
                          value={commentName}
                          onChange={(e) => setCommentName(e.target.value)}
                          required
                          className="bg-dark-black border-gray-700 text-white placeholder:text-gray-500 focus:border-lime-accent"
                        />
                      </div>
                      <div>
                        <label htmlFor="comment-email" className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                        <Input
                          id="comment-email"
                          type="email"
                          placeholder="Votre email"
                          value={commentEmail}
                          onChange={(e) => setCommentEmail(e.target.value)}
                          required
                          className="bg-dark-black border-gray-700 text-white placeholder:text-gray-500 focus:border-lime-accent"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="comment-text" className="block text-sm font-medium text-gray-300 mb-2">Commentaire *</label>
                      <textarea
                        id="comment-text"
                        placeholder="Écrivez votre commentaire ici..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        required
                        rows={5}
                        className="w-full rounded-md bg-dark-black border border-gray-700 text-white placeholder:text-gray-500 focus:border-lime-accent focus:outline-none focus:ring-1 focus:ring-lime-accent p-3 resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="bg-lime-accent text-dark-black hover:bg-lime-accent/90 rounded-full px-8 py-3 font-bold flex items-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Publier le commentaire
                    </Button>
                  </form>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4 space-y-8">

                {/* Newsletter Widget */}
                <div className="bg-lime-accent text-dark-black p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="h-6 w-6" />
                    <h3 className="text-xl font-bold font-poppins">Newsletter</h3>
                  </div>
                  <p className="text-dark-black/80 mb-6 text-sm font-medium">
                    Recevez nos derniers conseils et astuces directement dans votre boîte mail. Pas de spam, promis !
                  </p>
                  <div className="space-y-3">
                    <Input placeholder="Votre adresse email" className="bg-white/90 border-0 placeholder:text-gray-500 text-dark-black" />
                    <Button className="w-full bg-dark-black text-white hover:bg-dark-gray font-bold">
                      Je m'inscris
                    </Button>
                  </div>
                </div>

                {/* Strategic Services Widget */}
                <div className="bg-dark-gray p-6 rounded-2xl border border-gray-800">
                  <h3 className="text-xl font-bold font-poppins mb-6 border-b border-gray-700 pb-2">Nos expertises</h3>
                  <div className="flex flex-col gap-3">
                    {[
                      { name: "Création de sites web", path: "/services/creation-sites-web" },
                      { name: "Développement web", path: "/services/developpement-web" },
                      { name: "UI/UX Design", path: "/services/ui-ux-design" },
                      { name: "Marketing digital", path: "/services/marketing-digital" }
                    ].map(s => (
                      <Link
                        key={s.path}
                        to={s.path}
                        className="flex items-center justify-between group p-3 rounded-xl hover:bg-white/5 transition-all text-sm font-medium border border-transparent hover:border-gray-800"
                      >
                        <span className="group-hover:text-lime-accent transition-colors">{s.name}</span>
                        <ArrowUpRight className="h-4 w-4 text-gray-600 group-hover:text-lime-accent" />
                      </Link>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Similar Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="py-16 md:py-24 bg-dark-gray/50 border-t border-gray-800">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-8 h-px bg-lime-accent"></div>
                <h2 className="text-2xl md:text-3xl font-bold font-poppins">
                  Articles <span className="text-lime-accent">similaires</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relPost) => (
                  <Card key={relPost.slug} className="bg-dark-gray border-gray-800 overflow-hidden group text-left rounded-2xl flex flex-col">
                    <div className="relative overflow-hidden">
                      <Link to={`/blog/${relPost.slug}`}>
                        <img
                          src={relPost.featured_image}
                          alt={relPost.title}
                          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Link to={`/blog/${relPost.slug}`} className="bg-lime-accent text-dark-black rounded-full p-3 transform group-hover:scale-110 transition-transform">
                          <ArrowUpRight className="h-6 w-6" />
                        </Link>
                      </div>
                    </div>
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                        <Badge variant="outline" className="border-gray-600 text-gray-300">{relPost.category}</Badge>
                        <span>{new Date(relPost.published_at).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 flex-grow line-clamp-2">
                        <Link to={`/blog/${relPost.slug}`} className="hover:text-lime-accent transition-colors">{relPost.title}</Link>
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{relPost.excerpt}</p>
                      <Link to={`/blog/${relPost.slug}`} className="font-semibold text-lime-accent hover:underline self-start text-sm">
                        Lire la suite
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        <GlobalCta />
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
