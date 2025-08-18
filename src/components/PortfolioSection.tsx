import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const PortfolioSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-dark-black text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">Nos récentes réalisations</h2>
        <p className="text-lg text-gray-400 mb-12">Démonstration de notre savoir faire</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-dark-gray border-gray-800 overflow-hidden group">
            <img src="/public/placeholder.svg" alt="Site Commune Belel" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
            <CardContent className="p-6 text-left">
              <h3 className="text-2xl font-bold text-white">Site Commune Belel</h3>
              <p className="text-gray-400 mt-2">Un projet de refonte pour une meilleure expérience utilisateur.</p>
            </CardContent>
          </Card>
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left p-8 bg-dark-gray rounded-xl border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-4">Faites confiance aux experts pour tous vos besoins.</h3>
            <p className="text-gray-400 mb-6">Découvrez comment nous avons aidé d'autres entreprises à réussir en ligne.</p>
            <Button className="bg-lime-accent text-dark-black hover:bg-lime-accent/90 font-bold">
              Découvrez nos réalisations <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;