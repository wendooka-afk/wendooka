import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const GlobalCta: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-lime-accent text-dark-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">Parlons de votre projet digital</h2>
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          Un site web est un investissement stratégique. Nous vous aidons à concevoir une solution rentable, évolutive et alignée sur vos objectifs business.
        </p>
        <Button asChild className="bg-dark-black text-white hover:bg-dark-black/90 rounded-full px-10 py-6 font-bold text-xl transition-all" size="lg">
          <Link to="/contact">Obtenir un devis gratuit</Link>
        </Button>
      </div>
    </section>
  );
};

export default GlobalCta;