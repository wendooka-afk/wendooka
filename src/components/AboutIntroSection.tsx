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
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              Une agence digitale primée et reconnue
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Depuis plus de 10 ans, Wendooka accompagne entreprises, institutions et entrepreneurs dans la réussite de leurs projets en ligne.
              Notre mission : transformer vos idées en solutions digitales performantes qui génèrent un impact concret.
            </p>
            <Button asChild className="bg-lime-accent text-dark-black hover:bg-lime-accent/90 font-bold rounded-full px-8 py-4 text-lg">
              <Link to="/contact">Travailler avec nous</Link>
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