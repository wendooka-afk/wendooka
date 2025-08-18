import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const services = [
  { 
    title: "Création de sites web", 
    description: "Nous créons des sites web sur mesure, des designs graphiques et des campagnes de marketing digital pour répondre aux besoins de nos clients.",
    tags: ["Développement React.js", "Développement Angular", "Développement Laravel"]
  },
  { 
    title: "Design graphique",
    description: "Design graphique créatif pour une identité percutante qui vous démarque de la concurrence.",
    tags: ["Identité de marque", "Conception d'imprimés", "Conception numérique"]
  },
  { 
    title: "Marketing digital",
    description: "Marketing digital stratégique pour toucher votre audience cible et augmenter votre visibilité en ligne.",
    tags: ["SEO", "Marketing des médias sociaux", "Marketing par courriel"]
  },
  { 
    title: "E-commerce",
    description: "Solutions e-commerce complètes pour vendre vos produits en ligne de manière efficace et sécurisée.",
    tags: ["Shopify", "WooCommerce", "Magento"]
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white text-dark-black">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <p className="font-semibold text-lime-accent mb-2">Nos Services</p>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins">Nos services sur mésure</h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-lg text-gray-600">
              Chez Wendooka, nous offrons une gamme complète de services de web design pour aider nos clients à réussir en ligne.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-4">
            {services.map((service, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-2xl px-6">
                <AccordionTrigger className="text-2xl font-bold hover:no-underline py-6">
                  <span className="flex items-center gap-4">
                    <span className="text-gray-300">0{index + 1}.</span>
                    {service.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.tags.map(tag => <Badge key={tag} variant="outline" className="border-gray-300">{tag}</Badge>)}
                      </div>
                      <p className="text-gray-600 mb-6">{service.description}</p>
                      <img src="/public/placeholder.svg" alt={service.title} className="rounded-lg w-full h-auto object-cover" />
                    </div>
                    <div className="hidden md:block">
                       {/* This space can be used for another image or more details if needed */}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;