import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import GlobalCta from '@/components/GlobalCta';
import { projectsData } from '@/data/portfolio';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

const categories = ['Tous', 'Développement Web', 'UI/UX Design', 'E-commerce', 'Design Graphique'];

const PortfolioPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Tous');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'Tous') {
      return projectsData;
    }
    return projectsData.filter(project => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="bg-dark-black text-white">
      <Header />
      <main>
        <section className="py-20 md:py-32 text-center bg-dark-black">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-4">Nos Réalisations</h1>
            <p className="text-lg text-gray-400">
              <Link to="/" className="hover:text-lime-accent">Accueil</Link> / <span className="text-white">Réalisations</span>
            </p>
          </div>
        </section>
        
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
                    {categories.map(category => (
                        <Button 
                            key={category}
                            variant={activeFilter === category ? 'default' : 'outline'}
                            onClick={() => setActiveFilter(category)}
                            className={`rounded-full px-6 py-2 font-semibold transition-colors duration-300 ${
                                activeFilter === category 
                                ? 'bg-lime-accent text-dark-black hover:bg-lime-accent/90' 
                                : 'border-gray-600 text-gray-300 hover:bg-dark-gray hover:text-white'
                            }`}
                        >
                            {category}
                        </Button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredProjects.map((project, index) => (
                        <Card key={index} className="bg-dark-gray border-gray-800 overflow-hidden group text-left rounded-2xl flex flex-col">
                            <div className="relative overflow-hidden">
                                <img src={project.image} alt={project.title} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="bg-lime-accent text-dark-black rounded-full p-3 transform group-hover:scale-110 transition-transform">
                                        <ArrowUpRight className="h-6 w-6" />
                                    </a>
                                </div>
                            </div>
                            <CardContent className="p-6 flex flex-col flex-grow">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map(tag => <Badge key={tag} className="bg-gray-700 text-gray-300">{tag}</Badge>)}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 flex-grow">{project.title}</h3>
                                <p className="text-gray-400">{project.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        <GlobalCta />
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioPage;