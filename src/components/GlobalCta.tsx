import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const GlobalCta: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-lime-accent text-dark-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Prêt à Faire Passer Votre Business au Niveau Supérieur ?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">Un site web n’est pas une dépense, c’est un investissement. Et nous vous aidons à le rentabiliser rapidement.</p>
        <Button asChild className="bg-dark-black text-white hover:bg-gray-800 font-bold rounded-full px-8 py-4 text-lg">
          <Link to="/contact">📞 Obtenez un devis gratuit dès aujourd’hui</Link>
        </Button>
      </div>
    </section>
  );
};

export default GlobalCta;