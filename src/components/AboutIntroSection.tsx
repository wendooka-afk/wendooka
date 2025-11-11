import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutIntroSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-dark-black text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-semibold text-lime-accent mb-2">À Propos</p>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
            Une agence digitale primée et reconnue
          </h2>
          <p className="text-lg text-gray-400 mb-10">
            Depuis plus de 10 ans, Wendooka accompagne entreprises, institutions et entrepreneurs dans la réussite de leurs projets en ligne.
            Notre mission : transformer vos idées en solutions digitales performantes qui génèrent un impact concret.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
          <div className="bg-dark-gray rounded-2xl p-8 text-center border border-gray-800">
            <p className="text-4xl md:text-5xl font-bold text-lime-accent font-poppins">+150</p>
            <p className="text-gray-300">projets réalisés</p>
          </div>
          <div className="bg-dark-gray rounded-2xl p-8 text-center border border-gray-800">
            <p className="text-4xl md:text-5xl font-bold text-lime-accent font-poppins">+10</p>
            <p className="text-gray-300">ans d’expérience</p>
          </div>
          <div className="bg-dark-gray rounded-2xl p-8 text-center border border-gray-800">
            <p className="text-4xl md:text-5xl font-bold text-lime-accent font-poppins">95%</p>
            <p className="text-gray-300">de satisfaction client</p>
          </div>
        </div>

        <div className="text-center">
          <Button asChild className="bg-lime-accent text-dark-black hover:bg-lime-accent/90 font-bold rounded-full px-8 py-4 text-lg">
            <Link to="/contact">Travailler avec nous</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutIntroSection;