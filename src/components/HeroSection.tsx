import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-dark-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-black to-gray-900 opacity-90"></div>
      <div className="relative z-10 container mx-auto px-4 py-16 text-center max-w-screen-xl">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 font-poppins text-white">
          Transformez Votre Présence Digitale avec <span className="text-lime-accent">Wendooka</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto font-inter">
          Nous concevons des expériences web et marketing qui génèrent des résultats concrets.
          <br className="hidden md:block" />
          Obtenez <span className="text-lime-accent font-semibold">+38% de leads qualifiés en 90 jours</span>.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button
            className="bg-lime-accent text-dark-black hover:bg-lime-accent/90 px-8 py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            onClick={() => console.log("Demander un devis clicked")}
          >
            Demander un devis <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            className="border-lime-accent text-lime-accent hover:bg-lime-accent/10 px-8 py-6 text-lg font-bold rounded-xl transition-all duration-300 flex items-center gap-2"
            onClick={() => window.open("https://wa.me/YOUR_PHONE_NUMBER", "_blank")} // Replace with actual WhatsApp number
          >
            <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
          </Button>
        </div>

        {/* Social Proof Placeholder */}
        <div className="mt-12 pt-8 border-t border-gray-700/50">
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-6">Nos partenaires de confiance & chiffres clés</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-70">
            {/* Replace with actual client/partner logos */}
            <img src="/public/placeholder.svg" alt="Client Logo 1" className="h-8 md:h-10 filter grayscale hover:grayscale-0 transition-all duration-300" />
            <img src="/public/placeholder.svg" alt="Client Logo 2" className="h-8 md:h-10 filter grayscale hover:grayscale-0 transition-all duration-300" />
            <img src="/public/placeholder.svg" alt="Client Logo 3" className="h-8 md:h-10 filter grayscale hover:grayscale-0 transition-all duration-300" />
            <img src="/public/placeholder.svg" alt="Client Logo 4" className="h-8 md:h-10 filter grayscale hover:grayscale-0 transition-all duration-300" />
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-6 text-gray-300">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-lime-accent">18+</p>
              <p className="text-sm md:text-base">Années d'expérience</p>
            </div>
            <div className="hidden sm:block h-10 w-px bg-gray-700"></div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-lime-accent">250+</p>
              <p className="text-sm md:text-base">Projets réalisés</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;