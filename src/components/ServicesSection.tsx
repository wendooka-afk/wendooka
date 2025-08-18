import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const services = [
  { 
    title: "Création de sites web", 
    description: "Des sites vitrines et e-commerce modernes, optimisés pour générer des ventes et inspirer confiance."
  },
  { 
    title: "Design graphique",
    description: "Identités visuelles fortes, logos percutants et visuels qui marquent les esprits."
  },
  { 
    title: "UI/UX Design",
    description: "Expériences fluides et intuitives qui fidélisent vos utilisateurs."
  },
  { 
    title: "Marketing digital",
    description: "Campagnes ciblées qui boostent votre visibilité et vos conversions."
  },
  {
    title: "Maintenance & support",
    description: "Un suivi complet pour assurer la performance et la sécurité de votre site."
  }
];

const ServicesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white text-dark-black">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <p className="font-semibold text-lime-accent mb-2">Nos solutions digitales</p>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins">💡 Découvrez nos solutions digitales sur-mesure</h2>
          </div>
          <div>
            <p className="text-lg text-gray-600">
              Nous combinons stratégie, créativité et technologie pour offrir des solutions qui répondent à vos besoins réels et vous démarquent de la concurrence.
            </p>
          </div>
        </div>
        <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-4">
          {services.map((service, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-2xl px-6">
              <AccordionTrigger className="text-2xl font-bold hover:no-underline py-6">
                <span className="flex items-center gap-4">
                  <span className="text-gray-300">0{index + 1}.</span>
                  {service.title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-lg text-gray-700">
                {service.description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="text-center mt-12">
            <Button className="bg-lime-accent text-dark-black hover:bg-lime-accent/90 font-bold rounded-full px-8 py-4">
                Découvrir nos services <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;