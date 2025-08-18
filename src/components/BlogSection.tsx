import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const posts = [
  {
    category: "Développement Mobile",
    date: "21 Avril 2024",
    title: "Les secrets d'un développement d'application mobile réussi",
    description: "Découvrez les étapes clés pour créer une application mobile qui se démarque et engage vos utilisateurs.",
    image: "/public/placeholder.svg",
    link: "#"
  },
  {
    category: "Développement Web",
    date: "20 Avril 2024",
    title: "Des pixels à la perfection : le processus de développement web",
    description: "Un aperçu de notre processus de création de sites web, de la conception initiale au lancement final.",
    image: "/public/placeholder.svg",
    link: "#"
  },
  {
    category: "UI/UX Design",
    date: "19 Avril 2024",
    title: "L'évolution de l'UX/UI : les tendances qui façonnent l'avenir",
    description: "Explorez les dernières tendances en matière de design d'interface et d'expérience utilisateur.",
    image: "/public/placeholder.svg",
    link: "#"
  }
];

const BlogSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-dark-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-px bg-lime-accent"></div>
              <p className="font-semibold text-lime-accent">Actualités & Blog</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins">
              Nos derniers <span className="text-lime-accent">articles & actualités</span>
            </h2>
          </div>
          <Button asChild className="mt-4 md:mt-0 rounded-full p-0 bg-lime-accent hover:bg-lime-accent/90">
            <a href="#" className="flex items-center">
              <span className="pl-6 pr-4 py-3 text-dark-black font-bold">Voir tous les articles</span>
              <div className="bg-dark-black text-white rounded-full p-2 mr-1">
                <ArrowRight className="h-5 w-5" />
              </div>
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Card key={index} className="bg-dark-gray border-gray-800 overflow-hidden group text-left rounded-2xl flex flex-col">
              <div className="relative overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a href={post.link} className="bg-lime-accent text-dark-black rounded-full p-3 transform group-hover:scale-110 transition-transform">
                        <ArrowUpRight className="h-6 w-6" />
                    </a>
                </div>
              </div>
              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                  <Badge variant="outline" className="border-gray-600 text-gray-300">{post.category}</Badge>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 flex-grow">{post.title}</h3>
                <p className="text-gray-400 mb-4">{post.description}</p>
                <a href={post.link} className="font-semibold text-lime-accent hover:underline self-start">
                  Lire la suite
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;