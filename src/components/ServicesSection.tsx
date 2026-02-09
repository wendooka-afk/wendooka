import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { showError } from '@/utils/toast';
import DynamicIcon from '@/components/DynamicIcon';
import { Globe } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Service {
  slug: string;
  title: string;
  short_description: string;
  hero_image: string;
}

const ServicesSection: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('slug, title, short_description, hero_image')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        showError("Erreur lors du chargement des services : " + error.message);
      } else {
        setServices(data || []);
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

  const isLucideIcon = (value?: string) => !!value && value.startsWith('Lucide:');

  const renderIcon = (iconName: string, className = "h-10 w-10 text-dark-black") => {
    return <DynamicIcon name={iconName} className={className} />;
  };

  const renderMedia = (service: Service) => {
    // Image si URL, sinon icône si "Lucide:...", sinon icône par défaut
    const value = service.hero_image || '';
    if (!isLucideIcon(value) && value) {
      return (
        <div className="relative h-40 w-full overflow-hidden">
          <img
            src={value}
            alt={service.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      );
    }
    return (
      <div className="flex h-40 w-full items-center justify-center bg-lime-accent/20">
        <div className="rounded-full bg-lime-accent p-4">
          {isLucideIcon(value)
            ? renderIcon(value.replace('Lucide:', ''), "h-10 w-10 text-dark-black")
            : <Globe className="h-10 w-10 text-dark-black" />}
        </div>
      </div>
    );
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="rounded-2xl border border-gray-200">
                <Skeleton className="h-40 w-full" />
                <CardContent className="p-6 space-y-3">
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <div className="pt-4">
                    <Skeleton className="h-10 w-40 rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : services.length === 0 ? (
          <p className="text-gray-400 text-center">Aucun service publié pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link key={service.slug} to={`/services/${service.slug}`} className="group block focus:outline-none">
                <Card className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-lime-accent/50">
                  {renderMedia(service)}
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-600 line-clamp-3">{service.short_description}</p>
                    <div className="mt-5 flex items-center gap-2 text-dark-black font-semibold">
                      <span className="group-hover:underline">En savoir plus</span>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-lime-accent text-dark-black transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {!loading && services.length > 0 && (
          <div className="mt-12 text-center">
            <Button asChild className="bg-lime-accent text-dark-black font-bold group hover:bg-lime-accent/90 rounded-full px-8 py-4">
              <Link to="/services">
                Voir tous nos services
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;