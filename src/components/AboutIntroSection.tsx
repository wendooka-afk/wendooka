import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutIntroSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-dark-black text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Texte à gauche */}
          <div>
            <p className="font-semibold text-lime-accent mb-2">À Propos</p>
            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">
              Une agence web expérimentée, orientée résultats
            </h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Depuis plus de 10 ans, Wendooka accompagne entreprises, institutions et entrepreneurs dans la conception de solutions digitales performantes. Notre approche combine stratégie, design et technologie pour transformer vos idées en outils concrets de croissance.
            </p>
            <Button asChild variant="outline" className="border-lime-accent text-white hover:bg-lime-accent hover:text-dark-black font-bold rounded-full px-8 py-3 transition-all" size="lg">
              <Link to="/about">Découvrir l’agence</Link>
            </Button>
          </div>

          {/* Image à droite */}
          <div className="relative">
            <img
              src="/60349.webp"
              alt="À propos de Wendooka"
              className="rounded-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntroSection;