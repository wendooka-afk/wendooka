import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-dark-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-black to-gray-900 opacity-90"></div>
      <div className="relative z-10 container mx-auto px-4 py-16 text-center max-w-screen-xl">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 font-poppins text-white">
          Votre entreprise est <span className="text-lime-accent">unique</span>, votre site web devrait l'être aussi
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto font-inter">
          Chez Wendooka, nous créons des sites web sur mesure pour votre entreprise, afin de refléter votre identité de marque et vos besoins spécifiques. Nous travaillons en étroite collaboration avec vous pour comprendre vos objectifs et créer une présence en ligne qui vous démarque de la concurrence.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            className="bg-lime-accent text-dark-black hover:bg-lime-accent/90 px-8 py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            Découvrez nos réalisations <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;