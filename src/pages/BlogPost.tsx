import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { postsData } from '@/data/blog';
import { Calendar, User, Tag } from 'lucide-react';
import GlobalCta from '@/components/GlobalCta';

const BlogPostPage: React.FC = () => {
  const { postSlug } = useParams<{ postSlug: string }>();
  const post = postsData.find(p => p.slug === postSlug);

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
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-lime-accent" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-lime-accent" />
                <span>{post.category}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <img src={post.image} alt={post.title} className="rounded-2xl w-full h-auto object-cover mb-12" />
            <div className="prose prose-invert prose-lg max-w-none prose-h3:font-poppins prose-h3:text-lime-accent prose-a:text-lime-accent hover:prose-a:underline">
              {post.content}
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