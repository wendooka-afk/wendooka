import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowRight, Loader2, Zap, Target, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import MarqueeSection from '@/components/MarqueeSection';
import GlobalCta from '@/components/GlobalCta';
import { supabase } from '@/integrations/supabase/client';
import DynamicIcon from '@/components/DynamicIcon';
import { Globe, Layout, Server, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { servicesData } from '@/data/servicesData';
import { Service } from '@/types/service';

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Services digitaux sur-mesure pour votre croissance | Wendooka";
    const metaDescription = document.querySelector('meta[name="description"]');
    const content = "Création de sites web, développement sur-mesure, UI/UX design, identité visuelle et marketing digital pour des projets performants.";
    if (metaDescription) {
      metaDescription.setAttribute("content", content);
    }

    const fetchServices = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('services')
          .select('slug, title, short_description, icon, id')
          .eq('status', 'published')
          .order('id', { ascending: true });

        if (error || !data || data.length === 0) {
          // Keep only first 5 standard services if data is missing
          setServices(servicesData.slice(0, 5));
        } else {
          setServices(data as unknown as Service[]);
        }
      } catch (error: any) {
        setServices(servicesData.slice(0, 5));
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

  const renderLucideIcon = (iconName: string) => {
    return <DynamicIcon name={iconName} className="h-8 w-8 text-dark-black" />;
  };

  // Helper to get hub-specific text
  const getHubServiceText = (id: string, originalShort: string) => {
    switch (id) {
      case "1": return "Sites vitrines et e-commerce conçus pour renforcer votre crédibilité, générer des conversions et accompagner votre croissance digitale.";
      case "2": return "Applications web, plateformes SaaS et solutions métiers robustes, sécurisées et évolutives, adaptées à vos enjeux business.";
      case "3": return "Conception d’interfaces intuitives et performantes pour améliorer l’expérience utilisateur, la conversion et l’adoption.";
      case "4": return "Logos, chartes graphiques et supports visuels conçus pour construire des marques cohérentes et reconnaissables.";
      case "5": return "Stratégies SEO, publicité en ligne et actions d’acquisition pensées pour développer votre chiffre d’affaires et votre rentabilité.";
      default: return originalShort;
    }
  };

  const getHubServiceTitle = (id: string, originalTitle: string) => {
    switch (id) {
      case "1": return "Création de sites web sur-mesure";
      case "2": return "Développement web sur-mesure";
      case "3": return "UI/UX Design centré utilisateur";
      case "4": return "Design graphique & identité visuelle";
      case "5": return "Marketing digital orienté acquisition";
      default: return originalTitle;
    }
  };

  const getHubButtonText = (id: string) => {
    switch (id) {
      case "1": return "Découvrir nos solutions web";
      case "2": return "Voir l'expertise technique";
      case "3": return "Optimiser l'expérience client";
      case "4": return "Renforcer mon image de marque";
      case "5": return "Booster mon acquisition";
      default: return "En savoir plus";
    }
  };

  return (
    <div className="bg-dark-black text-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-24 md:py-40 text-center bg-cover bg-center" style={{ backgroundImage: `url('/118355.webp')` }}>
          <div className="absolute inset-0 bg-gradient-to-b from-dark-black/90 to-dark-black/60 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-poppins mb-6 leading-tight max-w-5xl mx-auto">
              Des services digitaux sur-mesure pour <span className="text-lime-accent">accélérer votre croissance</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 font-light">
              Nous combinons stratégie, design et technologie pour concevoir des solutions digitales performantes, pensées pour générer un impact business concret.
            </p>
            <div className="flex justify-center gap-2 text-sm text-gray-400">
              <Link to="/" className="hover:text-lime-accent transition-colors">Accueil</Link> / <span className="text-white font-medium">Services</span>
            </div>
          </div>
        </section>

        <MarqueeSection />

        {/* Intro SEO Section */}
        <section className="py-12 bg-white text-dark-black border-b border-gray-100">
          <div className="container mx-auto px-4">
            <p className="text-xl md:text-2xl text-center max-w-4xl mx-auto text-gray-600 leading-relaxed">
              Chaque entreprise a des enjeux digitaux spécifiques. Chez Wendooka, nous proposons des services web sur-mesure, conçus pour répondre à vos objectifs réels : visibilité, conversion, performance et évolutivité.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 md:py-32 bg-white text-dark-black relative">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-lime-accent font-bold tracking-wider uppercase text-sm mb-2 block">Nos Expertises Digitales</span>
              <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6 text-dark-black">Nos domaines d'intervention</h2>
              <p className="text-gray-600 text-lg">Chaque service est conçu comme un levier stratégique et s’intègre dans une vision globale de performance digitale.</p>
            </div>

            {loading ? (
              <div className="text-center text-gray-400 flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin mr-3 text-lime-accent" />
                <span className="text-lg text-dark-black">Chargement de nos expertises...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <Card
                    key={index}
                    className="bg-gray-50 border border-gray-100 rounded-3xl p-8 text-left flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
                  >
                    <div className="mb-8 bg-lime-accent rounded-2xl p-4 w-16 h-16 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {service.icon
                        ? renderLucideIcon(service.icon)
                        : <Globe className="h-8 w-8 text-dark-black" />
                      }
                    </div>
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-2xl font-bold font-poppins text-dark-black group-hover:text-lime-600 transition-colors">
                        {getHubServiceTitle(service.id, service.title)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 flex-grow mb-8">
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {getHubServiceText(service.id, service.short_description)}
                      </p>
                    </CardContent>
                    <CardFooter className="p-0">
                      <Button asChild variant="outline" className="w-full group-hover:bg-lime-accent group-hover:text-dark-black group-hover:border-lime-accent transition-all rounded-xl py-6 font-bold">
                        <Link to={`/services/${service.slug}`} className="flex items-center justify-center w-full">
                          {getHubButtonText(service.id)} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Why Choose Us / Our Approach */}
        <section className="py-20 md:py-32 bg-dark-gray text-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-lime-accent font-bold tracking-wider uppercase text-sm mb-2 block">Notre Approche</span>
                <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-8 leading-tight">
                  Plus qu'une agence,<br />un partenaire de croissance
                </h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  Nous ne vendons pas des prestations isolées, mais des solutions digitales pensées pour durer. Chaque projet est abordé avec une vision stratégique, orientée ROI et performance.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-dark-black p-3 rounded-full text-lime-accent border border-gray-800">
                      <Target className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">Stratégie Orientée ROI</h4>
                      <p className="text-gray-500">Chaque décision est guidée par vos objectifs business et votre retour sur investissement.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-dark-black p-3 rounded-full text-lime-accent border border-gray-800">
                      <Lightbulb className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">Créativité utile</h4>
                      <p className="text-gray-500">Un design qui sert la compréhension, la différenciation et la conversion.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-dark-black p-3 rounded-full text-lime-accent border border-gray-800">
                      <Zap className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">Technologie maîtrisée</h4>
                      <p className="text-gray-500">Performance, sécurité et évolutivité au cœur de chaque solution.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 bg-lime-accent/20 rounded-3xl blur-2xl transform rotate-2"></div>
                <img
                  src="/271248.webp"
                  alt="Partenaire de croissance digitale"
                  className="relative rounded-2xl w-full shadow-2xl border border-gray-800"
                />

                <div className="absolute -bottom-10 -left-10 bg-dark-black p-8 rounded-2xl border border-gray-800 shadow-xl hidden md:block">
                  <p className="text-gray-400 text-sm mb-2">Performance & ROI</p>
                  <p className="text-5xl font-bold text-lime-accent font-poppins">Garantis</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 md:py-32 bg-white text-dark-black">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-lime-accent font-bold tracking-wider uppercase text-sm mb-2 block">Comment nous travaillons</span>
              <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">Notre méthodologie de travail</h2>
              <p className="text-gray-600 text-lg">
                Un processus clair et structuré pour garantir des résultats mesurables à chaque étape.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>

              {[
                { number: "01", title: "Découverte & cadrage", desc: "Audit de vos besoins, analyse de la concurrence et définition des priorités." },
                { number: "02", title: "Stratégie & design", desc: "Conception de l'architecture, parcours utilisateurs et maquettes graphiques." },
                { number: "03", title: "Développement & optimisations", desc: "Codage sur-mesure, intégration SEO et optimisations de performance." },
                { number: "04", title: "Lancement & accompagnement", desc: "Mise en ligne sécurisée, formation et suivi des performances durables." }
              ].map((step, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg relative">
                  <div className="bg-dark-black text-lime-accent text-xl font-bold rounded-full w-12 h-12 flex items-center justify-center mb-6 border-4 border-white">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold font-poppins mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Expertise Section */}
        <section className="py-20 md:py-32 bg-gray-50 text-dark-black border-y border-gray-200">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">Une expertise technique au service de vos projets</h2>
              <p className="text-gray-600 text-lg">
                Nous sélectionnons les technologies les plus adaptées à chaque projet, selon vos besoins, vos contraintes et vos objectifs d’évolution.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white border-none shadow-md rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Layout className="text-lime-accent" /> Frontend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "Tailwind CSS", "Next.js", "Vue.js", "GSAP"].map(tech => (
                      <span key={tech} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">{tech}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white border-none shadow-md rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Server className="text-lime-accent" /> Backend & CMS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["Node.js", "Supabase", "PostgreSQL", "WordPress", "Strapi", "Firebase"].map(tech => (
                      <span key={tech} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">{tech}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white border-none shadow-md rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <PenTool className="text-lime-accent" /> Design & Outils
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["Figma", "Adobe Suite", "Webflow", "Git", "Vercel", "Docker"].map(tech => (
                      <span key={tech} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">{tech}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Conversion CTA Block */}
        <section className="py-20 bg-lime-accent text-dark-black">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">Parlons de votre projet digital</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto font-medium">
              Vous avez un projet web, une idée ou un besoin précis ? Échangeons sur vos objectifs et concevons ensemble une solution digitale performante et rentable.
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

export default ServicesPage;