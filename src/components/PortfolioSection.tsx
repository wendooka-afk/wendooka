import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    title: "Site Commune Belel",
    description: "Un projet de refonte pour une meilleure expérience utilisateur.",
    tags: ["UI/UX Design", "Développement Web", "Refonte"],
    image: "/public/placeholder.svg"
  },
  {
    title: "Application Mobile Podcast",
    description: "Une solution mobile pour écouter vos podcasts préférés.",
    tags: ["App Design", "Développement Mobile", "Wireframe"],
    image: "/public/placeholder.svg"
  }
];

const PortfolioSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-dark-black text-white">
      <div className="container mx-auto px-4 text-center">
        <p className="font-semibold text-lime-accent mb-2">Nos Projets</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">Nos récentes réalisations</h2>
        <p className="text-lg text-gray-400 mb-12">Démonstration de notre savoir faire</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <Card key={index} className="bg-dark-gray border-gray-800 overflow-hidden group text-left rounded-2xl">
              <div className="overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => <Badge key={tag} className="bg-gray-700 text-gray-300">{tag}</Badge>)}
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    <p className="text-gray-400 mt-2">{project.description}</p>
                  </div>
                  <a href="#" className="flex-shrink-0 mt-2 p-3 bg-lime-accent text-dark-black rounded-full group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight className="h-6 w-6" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;