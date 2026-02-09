import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Star, Sparkles } from 'lucide-react';
import RotatingText from './RotatingText';

const HeroSection: React.FC = () => {
  const services = ["Création de sites web", "Design graphique", "UI/UX Design", "Marketing digital"];

  return (
    <section className="bg-dark-black text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Colonne gauche */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <div className="w-8 h-px bg-lime-accent"></div>
              <p className="font-semibold text-lime-accent">Agence Digitale Primée</p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold leading-tight mb-6 font-poppins">
              Agence web spécialisée en <span className="text-lime-accent">création de sites</span> et solutions digitales sur-mesure
            </h1>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              {services.map(service => (
                <Badge key={service} variant="outline" className="text-white border-gray-600 px-4 py-2 rounded-full text-base hover:bg-dark-gray cursor-pointer">
                  {service}
                </Badge>
              ))}
            </div>
          </div>

          {/* Colonne droite */}
          <div className="lg:col-span-5">
            <div className="flex justify-center lg:justify-end mb-8">
              <RotatingText />
            </div>
            <p className="text-lg text-gray-300 text-center lg:text-left mb-8">
              Nous concevons des sites web, applications et expériences digitales performantes pour développer votre activité et générer un impact business mesurable.
            </p>
            <div className="flex justify-center lg:justify-start">
              <button className="bg-lime-accent text-dark-black hover:bg-white transition-all font-bold px-8 py-4 rounded-full text-lg shadow-[0_0_20px_rgba(198,255,0,0.3)]">
                Demander un devis gratuit
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-4 items-end mt-12">
          <div className="lg:col-span-7 relative">
            <img src="/8970.webp" alt="Mise en avant Wendooka" className="rounded-2xl w-full h-auto object-cover max-h-[400px]" />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white p-4 rounded-xl flex items-center gap-4 shadow-2xl">
              <div className="flex -space-x-3">
                <img className="h-10 w-10 rounded-full border-2 border-white object-cover" src="/5572.webp" alt="Reviewer 1" />
                <img className="h-10 w-10 rounded-full border-2 border-white object-cover" src="/7409.webp" alt="Reviewer 2" />
                <img className="h-10 w-10 rounded-full border-2 border-white object-cover" src="/8970.webp" alt="Reviewer 3" />
              </div>
              <div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <p className="font-bold text-dark-black ml-1 text-lg">4.9/5</p>
                </div>
                <p className="text-gray-500 text-xs font-semibold">Avis clients vérifiés</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="bg-dark-gray p-6 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold font-poppins text-lime-accent">150+</h3>
              <p className="text-sm text-gray-400">projets digitaux livrés</p>
            </div>
            <div className="bg-dark-gray p-6 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold font-poppins text-lime-accent">10+</h3>
              <p className="text-sm text-gray-400">ans d’expertise web</p>
            </div>
            <div className="bg-dark-gray p-6 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold font-poppins text-lime-accent">95%</h3>
              <p className="text-sm text-gray-400">satisfaction client</p>
            </div>
            <div className="bg-lime-accent p-6 rounded-2xl flex items-center justify-center text-center">
              <p className="font-bold text-dark-black leading-tight text-sm">Engagement <br /> Excellence <br /> ROI</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;