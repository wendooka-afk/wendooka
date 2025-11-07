import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { showError } from '@/utils/toast';

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link?: string;
}

const PortfolioSection: React.FC = () => {
  const [latestProjects, setLatestProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('title, description, tags, image, link')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(2); // Fetching 2 latest projects for this section

      if (error) {
        showError("Erreur lors du chargement des derniers projets : " + error.message);
      } else {
        setLatestProjects(data || []);
      }
      setLoading(false);
    };

    fetchLatestProjects();
  }, []);

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-dark-black text-white">
      <div className="container mx-auto px-4 text-center">
        <p className="font-semibold text-lime-accent mb-2">Nos réalisations</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">📂 Découvrez nos projets récents</h2>
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">Chaque projet est une nouvelle histoire de réussite. Voici quelques exemples qui démontrent notre savoir-faire.</p>
        
        {loading ? (
          <div className="text-center text-gray-400">Chargement des projets...</div>
        ) : latestProjects.length === 0 ? (
          <p className="text-gray-400 text-center">Aucun projet publié pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {latestProjects.map((project, index) => (
              <Card key={index} className="bg-dark-gray border-gray-800 overflow-hidden group text-left rounded-2xl">
                <div className="overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags?.map(tag => <Badge key={tag} className="bg-gray-700 text-gray-300">{tag}</Badge>)}
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                      <p className="text-gray-400 mt-2">{project.description}</p>
                    </div>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 mt-2 p-3 bg-lime-accent text-dark-black rounded-full group-hover:rotate-45 transition-transform duration-300">
                        <ArrowUpRight className="h-6 w-6" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <div className="mt-12">
            <Button asChild variant="outline" className="border-lime-accent text-white hover:bg-lime-accent hover:text-dark-black font-bold rounded-full px-8 py-4">
                <Link to="/portfolio">Voir toutes nos réalisations</Link>
            </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;