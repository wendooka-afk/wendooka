import React from 'react';
import { Button } from './ui/button';
import { CheckCircle } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-dark-black text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img src="/public/placeholder.svg" alt="Team discussion" className="rounded-2xl w-full h-auto object-cover" />
            <div className="absolute -bottom-8 -left-8 bg-lime-accent text-dark-black p-6 rounded-2xl shadow-lg">
              <h3 className="text-5xl font-bold font-poppins">10+</h3>
              <p className="font-semibold">Années d'Expérience</p>
            </div>
          </div>
          <div>
            <p className="font-semibold text-lime-accent mb-2">À Propos</p>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">🏆 Une agence digitale primée et reconnue</h2>
            <p className="text-gray-400 mb-6">
              Depuis plus de 10 ans, Wendooka accompagne entreprises, institutions et entrepreneurs dans la réussite de leurs projets en ligne. Notre mission : transformer vos idées en solutions digitales performantes qui génèrent un impact concret.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3"><CheckCircle className="h-6 w-6 text-lime-accent" /><span>+150 projets réalisés</span></li>
              <li className="flex items-center gap-3"><CheckCircle className="h-6 w-6 text-lime-accent" /><span>+10 ans d’expérience</span></li>
              <li className="flex items-center gap-3"><CheckCircle className="h-6 w-6 text-lime-accent" /><span>95% de satisfaction client</span></li>
            </ul>
            <Button className="bg-lime-accent text-dark-black hover:bg-lime-accent/90 font-bold rounded-full px-8 py-4">
              Travailler avec nous
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;