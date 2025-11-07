import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import MarqueeSection from '@/components/MarqueeSection';
import GlobalCta from '@/components/GlobalCta';
import { supabase } from '@/integrations/supabase/client';
import { showError } from '@/utils/toast';
import * as LucideIcons from 'lucide-react'; // Import all Lucide icons
import { Button } from '@/components/ui/button'; // Added this import

interface Service {
  slug: string;
  title: string;
  short_description: string;
  hero_image: string; // Using hero_image for the icon in this section
}

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('slug, title, short_description, hero_image')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) {
        showError("Erreur lors du chargement des services : " + error.message);
      } else {
        setServices(data || []);
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

  // Function to render Lucide icon dynamically
  const renderLucideIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent className="h-10 w-10 text-lime-accent" /> : <LucideIcons.HelpCircle className="h-10 w-10 text-lime-accent" />;
  };

  return (
    <div className="bg-dark-black text-white">
      <Header />
      <main>
        <section className="py-20 md:py-32 text-center bg-dark-black">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-4">Nos Services</h1>
            <p className="text-lg text-gray-400">
              <Link to="/" className="hover:text-lime-accent">Accueil</Link> / <span className="text-white">Services</span>
            </p>
          </div>
        </section>

        <MarqueeSection />

        <section className="py-16 md:py-24 bg-white text-dark-black">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center text-gray-400 flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                Chargement des services...
              </div>
            ) : services.length === 0 ? (
              <p className="text-gray-400 text-center">Aucun service publié pour le moment.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <Card key={index} className="bg-light-gray border-gray-200 rounded-2xl p-6 text-left flex flex-col hover:shadow-xl transition-shadow duration-300">
                    <div className="mb-6 bg-lime-accent text-dark-black rounded-full p-3 w-16 h-16 flex items-center justify-center">
                      {service.hero_image && service.hero_image.startsWith('Lucide:') ? 
                        renderLucideIcon(service.hero_image.replace('Lucide:', '')) : 
                        <LucideIcons.Globe className="h-10 w-10 text-lime-accent" />
                      }
                    </div>
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-2xl font-bold font-poppins">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 flex-grow">
                      <p className="text-gray-600">{service.short_description}</p>
                    </CardContent>
                    <Link to={`/services/${service.slug}`} className="mt-6 font-bold text-dark-black hover:underline flex items-center group">
                      Lire la suite <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-16 md:py-24 bg-dark-gray">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">Trouvez la solution à votre problème</h2>
                <p className="text-gray-400 mb-4">
                  Faites confiance aux experts pour tous vos besoins de conception et de développement Web. Que vous ayez besoin d’un site vitrine élégant, d’une boutique en ligne conviviale, ou d’une plateforme personnalisée, nous avons les compétences pour répondre à vos exigences.
                </p>
                <p className="text-gray-400 mb-8">
                  Nous travaillons en étroite collaboration avec vous pour créer une expérience en ligne qui vous démarque de la concurrence, en utilisant les dernières technologies pour fournir des solutions à la fois esthétiques et performantes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-lime-accent text-dark-black hover:bg-lime-accent/90 font-bold rounded-full px-8 py-4 text-lg">
                    <Link to="/portfolio">Découvrez nos réalisations</Link>
                  </Button>
                </div>
              </div>
              <div className="bg-lime-accent text-dark-black p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6">Contactez-nous</h3>
                <p className="mb-6">
                  Notre équipe amicale et compétente est prête à vous aider. N'hésitez pas à nous contacter pour discuter de vos besoins ou obtenir un devis.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <LucideIcons.Clock className="h-6 w-6 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold">Heures d'ouverture</h4>
                      <p>Du lundi au vendredi : 9h00 - 18h00</p>
                      <p>Samedi et dimanche : Fermé</p>
                    </div>
                  </div>
                  <a href="tel:+237672051289" className="flex items-center gap-4 group">
                    <LucideIcons.Phone className="h-6 w-6 flex-shrink-0" />
                    <span className="group-hover:underline">+237 672 05 12 89</span>
                  </a>
                  <a href="mailto:contact@wendooka.com" className="flex items-center gap-4 group">
                    <LucideIcons.Mail className="h-6 w-6 flex-shrink-0" />
                    <span className="group-hover:underline">contact@wendooka.com</span>
                  </a>
                   <div className="flex items-start gap-4">
                    <LucideIcons.MapPin className="h-6 w-6 mt-1 flex-shrink-0" />
                    <span>Carrefour Cinéma Adamaoua, Ngaoundéré, Cameroun</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <GlobalCta />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;