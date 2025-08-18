import React from 'react';
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-dark-black text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 font-poppins">
              🚀 Là où l’innovation rencontre l’<span className="text-lime-accent">excellence digitale</span>
            </h1>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto md:mx-0">
              Votre entreprise est unique, votre site web doit l’être aussi. Chez Wendooka, nous concevons des expériences digitales sur-mesure qui propulsent votre marque, captivent vos clients et transforment vos visiteurs en leads qualifiés.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button className="bg-lime-accent text-dark-black hover:bg-lime-accent/90 px-8 py-6 text-lg font-bold rounded-full">
                Obtenir un devis gratuit
              </Button>
              <Button variant="outline" className="border-lime-accent text-white hover:bg-lime-accent hover:text-dark-black px-8 py-6 text-lg font-bold rounded-full">
                Découvrir nos réalisations
              </Button>
            </div>
            <p className="mt-8 text-gray-500 text-sm">
              +150 projets livrés • 10+ années d’expérience • Clients au Cameroun & à l’international
            </p>
          </div>
          <div className="relative">
            <img src="/public/placeholder.svg" alt="Wendooka Team" className="rounded-2xl w-full h-auto object-cover filter grayscale" />
            <div className="absolute -bottom-8 -right-8 bg-lime-accent text-dark-black p-6 rounded-2xl shadow-lg w-64">
              <h3 className="text-4xl font-bold font-poppins">+150</h3>
              <p className="font-semibold">Projets Réalisés</p>
              <div className="my-4 h-px bg-dark-black/20"></div>
              <h3 className="text-4xl font-bold font-poppins">10+</h3>
              <p className="font-semibold">Années d'Expérience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;