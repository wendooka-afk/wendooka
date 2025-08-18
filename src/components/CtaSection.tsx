import React from 'react';
import { Button } from "@/components/ui/button";

const CtaSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-dark-gray text-white">
      <div className="container mx-auto px-4">
        <div className="bg-dark-black rounded-2xl p-8 md:p-12 border border-gray-800 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="lg:w-2/3 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Prêt à donner un nouvel élan à votre présence en ligne ?</h2>
            <p className="text-gray-400 text-lg">
              Notre équipe d'experts est prête à transformer votre vision en réalité. Contactez-nous dès aujourd'hui et découvrez comment nous pouvons vous aider à atteindre vos objectifs.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Button className="bg-lime-accent text-dark-black hover:bg-lime-accent/90 px-8 py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              Obtenez un devis personnalisé
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;