import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, Star, Loader2 } from 'lucide-react';
import GlobalCta from '@/components/GlobalCta';
import { supabase } from '@/integrations/supabase/client';
import { showError } from '@/utils/toast';
import * as LucideIcons from 'lucide-react'; // Import all Lucide icons

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

interface ProcessStep {
  icon: string;
  name: string;
  description: string;
}

interface ResultStat {
  value: string;
  label: string;
}

interface TestimonialItem {
  quote: string;
  author: string;
  company?: string;
}

interface Service {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  hero_image?: string;
  long_description?: string;

  intro_title?: string;
  intro_text?: string[]; // JSONB stored as array of strings
  intro_list?: string[]; // JSONB stored as array of strings
  intro_image?: string;

  prestations_title?: string;
  prestations_items?: ServiceItem[]; // JSONB stored as array of objects

  process_title?: string;
  process_steps?: ProcessStep[]; // JSONB stored as array of objects

  results_title?: string;
  results_stats?: ResultStat[]; // JSONB stored as array of objects
  results_text?: string;
  results_cta?: string;

  testimonials_title?: string;
  testimonials_items?: TestimonialItem[]; // JSONB stored as array of objects
}

const ServiceDetailPage: React.FC = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!serviceSlug) {
      setError("Slug de service manquant.");
      setLoading(false);
      return;
    }

    const fetchService = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('slug', serviceSlug)
        .eq('status', 'published')
        .single();

      if (error) {
        console.error("Erreur lors du chargement du service :", error);
        setError("Service non trouvé ou non publié.");
        setService(null);
      } else if (data) {
        setService(data);
      } else {
        setError("Service non trouvé ou non publié.");
        setService(null);
      }
      setLoading(false);
    };

    fetchService();
  }, [serviceSlug]);

  // Function to render Lucide icon dynamically
  const renderLucideIcon = (iconName: string, className: string = 'h-8 w-8') => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent className={className} /> : <LucideIcons.HelpCircle className={className} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-black text-white">
        <Loader2 className="h-8 w-8 animate-spin text-lime-accent" />
        <span className="ml-2">Chargement du service...</span>
      </div>
    );
  }

  if (error) {
    return <Navigate to="/404" replace />;
  }

  if (!service) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="bg-dark-black text-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 text-center bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(11, 11, 11, 0.7), rgba(11, 11, 11, 0.7)), url(${service.hero_image || '/public/placeholder-hero.svg'})` }}>
          <div className="container mx-auto px-4 z-10 relative">
            <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-4 max-w-4xl mx-auto">{service.title}</h1>
            {service.subtitle && <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">{service.subtitle}</p>}
            <Button asChild className="bg-lime-accent text-dark-black hover:bg-lime-accent/90 font-bold rounded-full px-8 py-4 text-lg">
                <Link to="/contact">📞 Demandez un devis gratuit</Link>
            </Button>
            <p className="text-lg text-gray-300 mt-8">
              <Link to="/" className="hover:text-lime-accent">Accueil</Link> / <Link to="/services" className="hover:text-lime-accent">Services</Link> / <span className="text-white">{service.title}</span>
            </p>
          </div>
        </section>

        {/* Intro Section */}
        {service.intro_title && (
          <section className="py-16 md:py-24 bg-dark-gray">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">{service.intro_title}</h2>
                    {service.intro_text?.map((p, i) => <p key={i} className="text-gray-400 mb-4 text-lg">{p}</p>)}
                    {service.intro_list && service.intro_list.length > 0 && (
                        <ul className="space-y-3 my-6 text-left">
                            {service.intro_list.map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-lg"><CheckCircle className="h-6 w-6 text-lime-accent flex-shrink-0" /><span>{item}</span></li>
                            ))}
                        </ul>
                    )}
                    <Button asChild variant="outline" className="border-lime-accent text-white hover:bg-lime-accent hover:text-dark-black font-bold rounded-full px-8 py-4 text-lg">
                        <Link to="/portfolio">🚀 Améliorez votre présence en ligne</Link>
                    </Button>
                </div>
                {service.intro_image && <img src={service.intro_image} alt={service.intro_title} className="rounded-2xl w-full h-auto object-cover" />}
              </div>
            </div>
          </section>
        )}

        {/* Prestations / Features Section */}
        {service.prestations_title && service.prestations_items && service.prestations_items.length > 0 && (
          <section className="py-16 md:py-24 bg-dark-black">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-12">{service.prestations_title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {service.prestations_items.map((feature, index) => (
                  <div key={index} className="bg-dark-gray p-8 rounded-2xl text-left flex flex-col items-start">
                    <div className="text-lime-accent mb-4">{renderLucideIcon(feature.icon, 'h-10 w-10')}</div>
                    <h3 className="text-xl font-bold mb-2 flex-grow">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Process Section */}
        {service.process_title && service.process_steps && service.process_steps.length > 0 && (
            <section className="py-16 md:py-24 bg-dark-gray">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins">{service.process_title}</h2>
                        <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">Nous suivons une approche structurée pour garantir la réussite de chaque projet.</p>
                    </div>
                    <div className="relative max-w-5xl mx-auto">
                        <div className="absolute top-8 left-0 w-full h-0.5 bg-gray-700 hidden md:block" aria-hidden="true"></div>
                        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-12">
                            {service.process_steps.map((step, index) => (
                                <div key={index} className="relative flex flex-col items-center text-center">
                                    <div className="z-10 bg-dark-black text-lime-accent h-16 w-16 rounded-full flex items-center justify-center mb-4 border-4 border-dark-gray">{renderLucideIcon(step.icon, 'h-8 w-8')}</div>
                                    <h3 className="text-xl font-bold mb-2">{step.name}</h3>
                                    <p className="text-gray-400 text-sm">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        )}

        {/* Results Section */}
        {service.results_title && service.results_stats && service.results_stats.length > 0 && (
            <section className="py-16 md:py-24 bg-dark-black">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">{service.results_title}</h2>
                    <div className="flex justify-center gap-8 md:gap-16 my-12">
                        {service.results_stats.map(stat => (
                            <div key={stat.label}>
                                <p className="text-5xl md:text-6xl font-bold text-lime-accent">{stat.value}</p>
                                <p className="text-gray-400">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                    {service.results_text && <p className="text-lg text-gray-300 mb-4">{service.results_text}</p>}
                    {service.results_cta && <p className="font-semibold text-lime-accent">{service.results_cta}</p>}
                </div>
            </section>
        )}

        {/* Testimonials Section */}
        {service.testimonials_title && service.testimonials_items && service.testimonials_items.length > 0 && (
            <section className="py-16 md:py-24 bg-dark-gray">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-12">{service.testimonials_title}</h2>
                    <div className="max-w-3xl mx-auto">
                        {service.testimonials_items.map((item, index) => (
                            <div key={index} className="bg-dark-black p-8 rounded-2xl">
                                <div className="flex justify-center mb-4">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
                                </div>
                                <blockquote className="text-xl italic text-white">"{item.quote}"</blockquote>
                                <p className="mt-4 font-bold text-gray-300">– {item.author}, {item.company}</p>
                            </div>
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

export default ServiceDetailPage;