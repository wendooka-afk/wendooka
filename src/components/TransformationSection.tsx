import React from 'react';
import { Brush, Navigation, Smartphone } from 'lucide-react';

const features = [
  {
    icon: <Brush className="h-8 w-8 text-lime-accent" />,
    title: "Design raffiné",
    description: "Nous avons modernisé l'apparence du site web en lui donnant une esthétique contemporaine et attrayante, mettant en valeur le contenu de manière visuellement impactante."
  },
  {
    icon: <Navigation className="h-8 w-8 text-lime-accent" />,
    title: "Navigation intuitive",
    description: "Nous avons repensé l'architecture de l'information pour rendre la navigation fluide et intuitive, permettant aux utilisateurs de trouver rapidement et facilement les informations qu'ils recherchent."
  },
  {
    icon: <Smartphone className="h-8 w-8 text-lime-accent" />,
    title: "Optimisation mobile",
    description: "Nous avons rendu le site web entièrement responsive, offrant une expérience utilisateur optimale sur tous les appareils, du bureau au mobile."
  }
];

const TransformationSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-dark-black text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">Transformez votre présence en ligne avec notre expertise en web design</h2>
            <p className="text-gray-400 mb-8">
              Découvrez comment notre agence de web design a donné une nouvelle vie à un site web existant. Nous avons appliqué notre savoir-faire et notre sens esthétique pour créer une expérience en ligne optimale qui reflète la vision et les valeurs de notre client.
            </p>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-dark-gray p-3 rounded-full">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img 
              src="/public/placeholder.svg" 
              alt="Web design transformation" 
              className="rounded-2xl w-full h-auto object-cover" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;