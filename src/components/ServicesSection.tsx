import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Globe, Palette, LayoutTemplate, Megaphone, Wrench, FileText, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: <Globe className="h-8 w-8 text-lime-accent" />,
    title: "Création de sites web",
    description: "Des sites vitrines et e-commerce modernes, optimisés pour générer des ventes et inspirer confiance."
  },
  {
    icon: <Palette className="h-8 w-8 text-lime-accent" />,
    title: "Design graphique",
    description: "Identités visuelles fortes, logos percutants et visuels qui marquent les esprits."
  },
  {
    icon: <LayoutTemplate className="h-8 w-8 text-lime-accent" />,
    title: "UI/UX Design",
    description: "Expériences fluides et intuitives qui fidélisent vos utilisateurs."
  },
  {
    icon: <Megaphone className="h-8 w-8 text-lime-accent" />,
    title: "Marketing digital",
    description: "Campagnes ciblées qui boostent votre visibilité et vos conversions."
  },
  {
    icon: <Wrench className="h-8 w-8 text-lime-accent" />,
    title: "Maintenance & support",
    description: "Un suivi complet pour assurer la performance et la sécurité de votre site."
  },
  {
    icon: <FileText className="h-8 w-8 text-lime-accent" />,
    title: "Création de contenu",
    description: "Nous produisons du contenu engageant qui génère des résultats, aligné sur vos objectifs."
  }
];

const ServicesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white text-dark-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <p className="font-semibold text-lime-accent mb-2">Nos solutions digitales</p>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">💡 Découvrez nos solutions digitales sur-mesure</h2>
          <p className="text-lg text-gray-600">
            Nous combinons stratégie, créativité et technologie pour offrir des solutions qui répondent à vos besoins réels et vous démarquent de la concurrence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-white border border-gray-200 rounded-2xl p-6 text-center flex flex-col items-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="mb-4 bg-lime-accent/20 p-4 rounded-full">
                {service.icon}
              </div>
              <CardHeader className="p-0 mb-2">
                <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex-grow">
                <p className="text-gray-600">{service.description}</p>
              </CardContent>
              <Button variant="link" className="mt-4 text-lime-accent font-bold hover:text-dark-black group">
                En savoir plus <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;