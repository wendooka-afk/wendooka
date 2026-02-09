import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { showError } from '@/utils/toast';
import { projectsData } from '@/data/servicesData';
import { Project } from '@/types/project';
import ExpandOnHover from '@/components/ui/expand-cards';

const PortfolioSection: React.FC = () => {
  const [latestProjects, setLatestProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProjects = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false })
          .limit(5);

        if (data && data.length > 0) {
          setLatestProjects(data as unknown as Project[]);
        } else {
          setLatestProjects(projectsData.slice(0, 5));
        }
      } catch {
        setLatestProjects(projectsData.slice(0, 5));
      }
      setLoading(false);
    };

    fetchLatestProjects();
  }, []);

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-dark-black text-white">
      <div className="container mx-auto px-4 text-center">
        <p className="font-semibold text-lime-accent mb-2">Portfolio</p>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 font-poppins">Des projets web concrets, des résultats mesurables</h2>
        <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">Chaque projet est pensé pour répondre à un objectif précis : visibilité, performance, conversion ou scalabilité.</p>

        {loading ? (
          <div className="text-center text-gray-400">Chargement des projets...</div>
        ) : latestProjects.length === 0 ? (
          <p className="text-gray-400 text-center">Aucun projet publié pour le moment.</p>
        ) : (
          <div className="w-full">
            <ExpandOnHover projects={latestProjects} />
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