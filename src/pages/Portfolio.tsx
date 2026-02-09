import React, { useState, useMemo, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import GlobalCta from '@/components/GlobalCta';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Loader2, Eye, Globe, Code, Layout, Palette, BarChart } from 'lucide-react';
import ExpandOnHover from '@/components/ui/expand-cards';
import { supabase } from '@/integrations/supabase/client';
import { projectsData } from '@/data/servicesData';
import { Project } from '@/types/project';

const PortfolioPage: React.FC = () => {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Tous');

  useEffect(() => {
    document.title = "Réalisations web & projets digitaux performants | Wendooka";
    const metaDescription = document.querySelector('meta[name="description"]');
    const content = "Découvrez nos réalisations web : sites, applications, e-commerce et stratégies digitales conçus pour générer des résultats concrets.";
    if (metaDescription) {
      metaDescription.setAttribute("content", content);
    }

    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'published')
        .order('id', { ascending: false });

      if (data && data.length > 0) {
        setAllProjects(data as unknown as Project[]);
      } else {
        setAllProjects(projectsData);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    allProjects.forEach(project => {
      if (project.category) {
        uniqueCategories.add(project.category);
      }
    });
    return ['Tous', ...Array.from(uniqueCategories)];
  }, [allProjects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'Tous') {
      return allProjects;
    }
    return allProjects.filter(project => project.category === activeFilter);
  }, [activeFilter, allProjects]);

  return (
    <div className="bg-dark-black text-white">
      <Header />
      <main>
        {/* Updated Hero Section */}
        <section className="relative py-24 md:py-32 text-center bg-cover bg-center" style={{ backgroundImage: `url('/125484.webp')` }}>
          <div className="absolute inset-0 bg-dark-black/85 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6">Des projets digitaux concrets, pensés pour la performance</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 font-light">
              Chaque réalisation Wendooka répond à un objectif précis : crédibilité, conversion, performance ou scalabilité. Découvrez comment nous transformons des idées en solutions digitales efficaces.
            </p>
            <div className="flex justify-center gap-2 text-sm text-gray-500">
              <Link to="/" className="hover:text-lime-accent transition-colors">Accueil</Link> / <span className="text-white">Réalisations</span>
            </div>
          </div>
        </section>

        {/* Intro Contextual */}
        <section className="py-12 bg-white text-dark-black border-b border-gray-100">
          <div className="container mx-auto px-4">
            <p className="text-xl md:text-2xl text-center max-w-4xl mx-auto text-gray-600 leading-relaxed italic">
              "Derrière chaque projet présenté ici, il y a un enjeu business réel. Sites vitrines, e-commerce, applications web ou stratégies marketing : nos réalisations illustrent notre capacité à concevoir des solutions digitales sur-mesure."
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-dark-black overflow-hidden relative">
          <div className="container mx-auto px-4">
            {/* Filter Buttons Section */}
            <div className="text-center mb-10">
              <p className="text-gray-400 mb-6 text-lg">Filtrez nos réalisations par typologie de projet pour découvrir les expertises qui correspondent à vos besoins.</p>
              <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={activeFilter === category ? 'default' : 'outline'}
                    onClick={() => setActiveFilter(category)}
                    className={`rounded-full px-6 py-2 font-semibold transition-all duration-300 ${activeFilter === category
                      ? 'bg-lime-accent text-dark-black hover:bg-lime-accent/90 scale-105'
                      : 'border-gray-800 text-gray-400 hover:bg-dark-gray hover:text-white'
                      }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Featured Projects Title (Optional but effective) */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold font-poppins text-white border-l-4 border-lime-accent pl-4">Projets emblématiques</h2>
            </div>

            {/* Projects Display */}
            {loading ? (
              <div className="text-center text-gray-400 flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin mr-3 text-lime-accent" />
                Chargement des projets...
              </div>
            ) : filteredProjects.length === 0 ? (
              <p className="text-gray-400 text-center py-20">Aucun projet publié pour le moment dans cette catégorie.</p>
            ) : (
              <ExpandOnHover projects={filteredProjects} />
            )}
          </div>
        </section>

        {/* Strategic Service Linking Section */}
        <section className="py-20 md:py-32 bg-gray-50 text-dark-black border-y border-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6 leading-tight">Des réalisations alignées avec nos expertises</h2>
              <p className="text-gray-600 text-lg">
                Chaque projet présenté ici s’appuie sur une ou plusieurs de nos expertises digitales pour garantir un succès durable et un impact business réel.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Création de sites web",
                  desc: "Sites vitrines & e-commerce optimisés pour la conversion et la crédibilité.",
                  path: "/services/creation-sites-web",
                  icon: Globe
                },
                {
                  name: "Développement web",
                  desc: "Applications métiers & plateformes SaaS robustes, sécurisées et évolutives.",
                  path: "/services/developpement-web",
                  icon: Code
                },
                {
                  name: "UI/UX Design",
                  desc: "Conception d'expériences fluides et intuitives centrées sur l'utilisateur.",
                  path: "/services/ui-ux-design",
                  icon: Layout
                },
                {
                  name: "Design graphique",
                  desc: "Identités visuelles fortes et chartes graphiques cohérentes pour marquer les esprits.",
                  path: "/services/design-graphique",
                  icon: Palette
                },
                {
                  name: "Marketing digital",
                  desc: "Stratégies d'acquisition (SEO/SEA) pour booster votre visibilité et votre ROI.",
                  path: "/services/marketing-digital",
                  icon: BarChart
                }
              ].map((service) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.name}
                    to={service.path}
                    className="group bg-white border border-gray-100 p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:border-lime-accent/30 transition-all duration-500 flex flex-col items-start text-left"
                  >
                    <div className="mb-8 bg-lime-accent rounded-2xl p-4 w-16 h-16 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-dark-black group-hover:text-lime-accent transition-all duration-300">
                      <Icon className="h-8 w-8 transition-colors duration-300" />
                    </div>
                    <h3 className="text-2xl font-bold font-poppins mb-4 group-hover:text-lime-600 transition-colors leading-tight">{service.name}</h3>
                    <p className="text-gray-500 mb-8 flex-grow leading-relaxed text-lg">{service.desc}</p>
                    <div className="flex items-center text-dark-black font-bold text-sm uppercase tracking-widest gap-2">
                      En savoir plus <ArrowUpRight className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA Alignment */}
        <section className="py-20 bg-lime-accent text-dark-black">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">Et si votre projet était le prochain ?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto font-medium">
              Vous avez un projet web, applicatif ou marketing ? Inspirons-nous de ces réalisations pour concevoir une solution digitale performante, adaptée à vos objectifs et à votre budget.
            </p>
            <Button asChild variant="default" size="lg" className="bg-dark-black text-white hover:bg-gray-900 rounded-full px-10 py-7 text-lg uppercase tracking-wider font-bold shadow-xl">
              <Link to="/contact">Obtenir un devis gratuit</Link>
            </Button>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default PortfolioPage;