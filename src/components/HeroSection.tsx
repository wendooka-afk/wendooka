import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-dark-black text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <p className="font-semibold text-lime-accent mb-2">Agence Digitale Primée</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 font-poppins">
              Votre entreprise est <span className="text-lime-accent">unique</span>, votre site web devrait l'être aussi
            </h1>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto md:mx-0">
              Chez Wendooka, nous créons des sites web sur mesure pour votre entreprise, afin de refléter votre identité de marque et vos besoins spécifiques.
            </p>
            <Button className="bg-lime-accent text-dark-black hover:bg-lime-accent/90 px-8 py-6 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto md:mx-0">
              Découvrez nos réalisations <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="relative">
            <img src="/public/placeholder.svg" alt="Wendooka Team" className="rounded-2xl w-full h-auto object-cover filter grayscale" />
            <div className="absolute -bottom-8 -right-8 bg-lime-accent text-dark-black p-6 rounded-2xl shadow-lg w-64">
              <h3 className="text-4xl font-bold font-poppins">250+</h3>
              <p className="font-semibold">Projets Réalisés</p>
              <div className="my-4 h-px bg-dark-black/20"></div>
              <h3 className="text-4xl font-bold font-poppins">18+</h3>
              <p className="font-semibold">Années d'Expérience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;