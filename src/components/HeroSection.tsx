import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Star, Sparkles } from 'lucide-react';
import RotatingText from './RotatingText';

const HeroSection: React.FC = () => {
  const services = ["Création de sites web", "Design graphique", "UI/UX Design", "Marketing digital"];

  return (
    <section className="bg-dark-black text-white pt-16 md:pt-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <div className="w-8 h-px bg-lime-accent"></div>
              <p className="font-semibold text-lime-accent">Agence Digitale Primée</p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 font-poppins">
              Là où l’innovation rencontre l’<span className="text-lime-accent">excellence digitale</span>
            </h1>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              {services.map(service => (
                <Badge key={service} variant="outline" className="text-white border-gray-600 px-4 py-2 rounded-full text-base hover:bg-dark-gray cursor-pointer">
                  {service}
                </Badge>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5">
            <div className="flex justify-center lg:justify-end mb-8">
              <RotatingText />
            </div>
            <p className="text-lg text-gray-400 mb-8 text-center lg:text-left max-w-md mx-auto lg:mx-0">
              Votre entreprise est unique, votre site web doit l’être aussi. Chez Wendooka, nous concevons des expériences digitales sur-mesure qui propulsent votre marque.
            </p>
          </div>
        </div>
        <div className="grid lg:grid-cols-12 gap-4 items-end mt-20">
            <div className="lg:col-span-7 relative">
                <img src="https://cdn.leonardo.ai/users/f36e5340-387b-44c7-8263-9ee6cef52eac/generations/c8d76178-82cb-4011-bbf1-b234ae3cdb4c/segments/1:1:1/Default_A_team_of_young_African_developers_in_a_modern_office__0.jpg" alt="L'équipe Wendooka" className="rounded-2xl w-full h-auto object-cover" />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 bg-dark-gray/80 backdrop-blur-sm p-4 rounded-xl flex items-center gap-4 border border-gray-700">
                    <div className="flex -space-x-4">
                        <img className="inline-block h-10 w-10 rounded-full ring-2 ring-dark-gray object-cover" src="https://cdn.leonardo.ai/users/f36e5340-387b-44c7-8263-9ee6cef52eac/generations/c8d76178-82cb-4011-bbf1-b234ae3cdb4c/segments/1:1:1/Default_A_team_of_young_African_developers_in_a_modern_office__0.jpg" alt="Client satisfait 1"/>
                        <img className="inline-block h-10 w-10 rounded-full ring-2 ring-dark-gray object-cover" src="https://cdn.leonardo.ai/users/f36e5340-387b-44c7-8263-9ee6cef52eac/generations/c8d76178-82cb-4011-bbf1-b234ae3cdb4c/segments/1:1:1/Default_A_team_of_young_African_developers_in_a_modern_office__0.jpg" alt="Client satisfait 2"/>
                        <img className="inline-block h-10 w-10 rounded-full ring-2 ring-dark-gray object-cover" src="https://cdn.leonardo.ai/users/f36e5340-387b-44c7-8263-9ee6cef52eac/generations/c8d76178-82cb-4011-bbf1-b234ae3cdb4c/segments/1:1:1/Default_A_team_of_young_African_developers_in_a_modern_office__0.jpg" alt="Client satisfait 3"/>
                    </div>
                    <div>
                        <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        <p className="font-bold text-white ml-1">4.9 Star</p>
                        </div>
                        <p className="text-gray-400 text-sm">Reviews</p>
                    </div>
                </div>
                <Sparkles className="absolute top-8 left-8 h-12 w-12 text-lime-accent animate-pulse" />
            </div>
            <div className="lg:col-span-5 bg-lime-accent text-dark-black p-8 rounded-2xl space-y-6">
              <div>
                <h3 className="text-4xl font-bold font-poppins">+150</h3>
                <p className="font-semibold">Projets réalisés</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold font-poppins">10+</h3>
                <p className="font-semibold">Années d’expérience</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold font-poppins">95%</h3>
                <p className="font-semibold">Satisfaction client</p>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;