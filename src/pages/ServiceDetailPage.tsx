import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, Star, Loader2, Plus, Minus, ArrowUpRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import GlobalCta from '@/components/GlobalCta';
import { supabase } from '@/integrations/supabase/client';
import { showError } from '@/utils/toast';
import { sanitizeHtml } from '@/lib/sanitize';
import DynamicIcon from '@/components/DynamicIcon';
import { servicesData } from '@/data/servicesData';
import { Service, ServiceItem, ProcessStep, ResultStat, TestimonialItem } from '@/types/service';

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

      // Try Supabase first
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('slug', serviceSlug)
        .eq('status', 'published')
        .single();

      if (data) {
        setService(data);
      } else {
        // Fallback to mock data
        const mockService = servicesData.find(s => s.slug === serviceSlug);

        if (mockService) {
          setService(mockService);
        } else {
          setError("Service non trouvé ou non publié.");
          setService(null);
        }
      }
      setLoading(false);
    };

    fetchService();
  }, [serviceSlug]);

  // Set SEO meta tags
  useEffect(() => {
    if (service) {
      document.title = service.seo_title || service.title;
      const metaDescriptionTag = document.querySelector('meta[name="description"]');
      if (metaDescriptionTag && service.meta_description) {
        metaDescriptionTag.setAttribute('content', service.meta_description);
      } else if (service.meta_description) {
        const newMetaTag = document.createElement('meta');
        newMetaTag.name = 'description';
        newMetaTag.content = service.meta_description;
        document.head.appendChild(newMetaTag);
      }
      const canonicalLinkTag = document.querySelector('link[rel="canonical"]');
      if (canonicalLinkTag && service.canonical_url) {
        canonicalLinkTag.setAttribute('href', service.canonical_url);
      } else if (service.canonical_url) {
        const newLinkTag = document.createElement('link');
        newLinkTag.rel = 'canonical';
        newLinkTag.href = service.canonical_url;
        document.head.appendChild(newLinkTag);
      }
    }
  }, [service]);

  // Function to render Lucide icon dynamically
  const renderLucideIcon = (iconName: string, className: string = 'h-8 w-8') => {
    return <DynamicIcon name={iconName} className={className} />;
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
    return (
      <div className="text-white text-center py-20 px-4 min-h-screen bg-dark-black">
        <h1 className="text-2xl text-red-500 mb-4">Erreur: {error}</h1>
        <div className="mb-8">
          <p className="mb-2">Slug demandé : <span className="font-mono bg-gray-800 p-1 rounded text-yellow-500">{serviceSlug}</span></p>
          <p className="text-gray-400 text-sm mb-4">Vérifiez la correspondance exacte avec la liste ci-dessous.</p>

          <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-xl text-left border border-gray-800">
            <h3 className="font-bold mb-3 border-b border-gray-700 pb-2">Slugs disponibles (Mock Data) :</h3>
            <ul className="space-y-1 font-mono text-sm text-lime-accent">
              {servicesData?.map(s => <li key={s.slug}>{s.slug}</li>) || <li className="text-red-500">Aucune donnée mock disponible</li>}
            </ul>
          </div>
        </div>
        <Link to="/services" className="bg-lime-accent text-dark-black hover:bg-lime-accent/90 font-bold rounded-full px-8 py-3">
          Retour aux services
        </Link>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-white text-center py-20">
        <h1 className="text-2xl">Service introuvable (state is null)</h1>
        <p>Slug: {serviceSlug}</p>
        <Link to="/services" className="text-lime-accent underline">Retour aux services</Link>
      </div>
    );
  }

  return (
    <div className="bg-dark-black text-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 text-center bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(11, 11, 11, 0.7), rgba(11, 11, 11, 0.7)), url(${service.hero_image || '/125484.webp'})` }}>
          <div className="container mx-auto px-4 z-10 relative">
            <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-4 max-w-4xl mx-auto">{service.title}</h1>
            {service.subtitle && <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">{service.subtitle}</p>}
            <Button asChild className="bg-lime-accent text-dark-black hover:bg-lime-accent/90 font-bold rounded-full px-8 py-4 text-lg">
              <Link to="/contact">{service.hero_cta || '📞 Demandez un devis gratuit'}</Link>
            </Button>
            <p className="text-lg text-gray-300 mt-8">
              <Link to="/" className="hover:text-lime-accent">Accueil</Link> / <Link to="/services" className="hover:text-lime-accent">Services</Link> / <span className="text-white">{service.title}</span>
            </p>
          </div>
        </section>

        {/* Long Description Section */}
        {service.long_description && (
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-4xl prose prose-invert prose-lg">
              <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(service.long_description) }} />
            </div>
          </section>
        )}

        {/* Intro Section */}
        {service.intro_title && (
          <section className="py-16 md:py-24 bg-dark-gray">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="text-center md:text-left">
                  <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">{service.intro_title}</h2>
                  {service.intro_text?.map((p, i) => <p key={i} className="text-gray-400 mb-4 text-lg leading-relaxed">{p}</p>)}
                  {service.intro_list && service.intro_list.length > 0 && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 my-8 text-left">
                      {service.intro_list.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-lg leading-tight">
                          <CheckCircle className="h-6 w-6 text-lime-accent flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Button asChild variant="glow" className="font-bold rounded-full px-8 py-4 text-lg mt-4">
                    <Link to="/contact">🚀 Améliorez votre présence en ligne</Link>
                  </Button>
                </div>
                {service.intro_image && (
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-lime-accent/10 rounded-2xl blur-xl group-hover:bg-lime-accent/20 transition-all"></div>
                    <img src={service.intro_image} alt={service.intro_title} className="relative rounded-2xl w-full h-auto object-cover shadow-2xl" />
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Secondary Content Section */}
        {service.secondary_content && (
          <section className="py-16 md:py-24 bg-dark-black">
            <div className="container mx-auto px-4 max-w-4xl prose prose-invert prose-lg">
              <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(service.secondary_content) }} />
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

        {/* FAQ Section */}
        {service.faqs && service.faqs.length > 0 && (
          <section className="py-16 md:py-24 bg-dark-black border-t border-gray-800">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-12 text-center">
                {service.faqs_title || 'Questions fréquentes'}
              </h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {service.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border border-gray-800 bg-dark-gray px-6 rounded-2xl overflow-hidden">
                    <AccordionTrigger className="text-left text-lg font-bold hover:text-lime-accent transition-colors py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-400 text-lg pb-6 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        )}

        {/* Strategic Maillage: Pour aller plus loin */}
        {service.related_articles && service.related_articles.length > 0 && (
          <section className="py-20 bg-dark-gray border-t border-gray-800">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold font-poppins mb-10">Pour aller plus loin</h2>
              <div className="flex flex-wrap justify-center gap-6">
                {service.related_articles.map((article) => (
                  <Link
                    key={article.slug}
                    to={`/blog/${article.slug}`}
                    className="bg-dark-black border border-gray-800 hover:border-lime-accent px-8 py-5 rounded-2xl font-bold transition-all text-gray-300 hover:text-white group flex items-center gap-3"
                  >
                    {article.title}
                    <ArrowUpRight className="h-4 w-4 text-gray-600 group-hover:text-lime-accent transition-colors" />
                  </Link>
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