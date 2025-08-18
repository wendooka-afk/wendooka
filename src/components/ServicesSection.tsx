import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Brush, Megaphone, ShoppingCart, Wrench } from 'lucide-react';

const services = [
  { title: "Création de sites web", icon: <Code className="h-8 w-8 text-lime-accent" /> },
  { title: "Design graphique", icon: <Brush className="h-8 w-8 text-lime-accent" /> },
  { title: "Marketing digital", icon: <Megaphone className="h-8 w-8 text-lime-accent" /> },
  { title: "E-commerce", icon: <ShoppingCart className="h-8 w-8 text-lime-accent" /> },
  { title: "Maintenance et support", icon: <Wrench className="h-8 w-8 text-lime-accent" /> },
];

const ServicesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-dark-gray text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">Nos services sur mésure</h2>
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
          Nous offrons une gamme complète de services de web design pour aider nos clients à réussir en ligne.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-dark-black border-gray-800 text-left hover:border-lime-accent hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center p-4">
              <CardHeader>
                {service.icon}
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl font-bold text-white">{service.title}</CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;