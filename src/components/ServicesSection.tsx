import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { showError } from '@/utils/toast';
import * as LucideIcons from 'lucide-react'; // Import all Lucide icons

interface Service {
  slug: string;
  title: string;
  short_description: string;
  hero_image: string; // Using hero_image for the icon in this section
}

const ServicesSection: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('slug, title, short_description, hero_image') // Using hero_image as a placeholder for an icon or small image
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(6); // Limit to 6 services for the home page section

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
    return IconComponent ? <IconComponent className="h-8 w-8 text-dark-black" /> : <LucideIcons.HelpCircle className="h-8 w-8 text-dark-black" />;
  };

  return (
    <section className="py-16 md:py-24 bg-white text-dark-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <p className="font-semibold text-dark-black mb-2">Nos solutions digitales</p>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">💡 Découvrez nos solutions digitales sur-mesure</h2>
          <p className="text-lg text-gray-600">
            Nous combinons stratégie, créativité et technologie pour offrir des solutions qui répondent à vos besoins réels et vous démarquent de la concurrence.
          </p>
        </div>
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
              <Card key={index} className="bg-white border border-gray-200 rounded-2xl p-6 text-center flex flex-col items-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="mb-4 bg-lime-accent p-4 rounded-full">
                  {/* For now, using a generic icon or a placeholder. In ServiceForm, we collect hero_image, 
                      but for this section, a simple icon might be better. If hero_image is an icon name, use it. */}
                  {service.hero_image && service.hero_image.startsWith('Lucide:') ? 
                    renderLucideIcon(service.hero_image.replace('Lucide:', '')) : 
                    <LucideIcons.Globe className="h-8 w-8 text-dark-black" />
                  }
                </div>
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-grow">
                  <p className="text-gray-600">{service.short_description}</p>
                </CardContent>
                <Button asChild className="mt-4 bg-lime-accent text-dark-black font-bold group hover:bg-lime-accent/90">
                  <Link to={`/services/${service.slug}`}>
                    En savoir plus <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;