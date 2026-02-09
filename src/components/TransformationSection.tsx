import React from 'react';
import { Search, Palette, Code, Rocket } from 'lucide-react';

const steps = [
  {
    icon: <Search className="h-8 w-8 text-lime-accent" />,
    title: "01. Découverte & Stratégie",
    description: "Nous analysons votre marché, vos objectifs et votre cible pour définir une feuille de route claire et orientée résultats."
  },
  {
    icon: <Palette className="h-8 w-8 text-lime-accent" />,
    title: "02. Design & Conception",
    description: "Création de maquettes uniques et centrées sur l'utilisateur pour garantir une expérience fluide et une conversion maximale."
  },
  {
    icon: <Code className="h-8 w-8 text-lime-accent" />,
    title: "03. Développement & Tests",
    description: "Intégration technique robuste avec les dernières technologies pour un site rapide, sécurisé et performant."
  },
  {
    icon: <Rocket className="h-8 w-8 text-lime-accent" />,
    title: "04. Lancement & Suivi",
    description: "Mise en ligne, optimisation SEO finale et accompagnement pour faire évoluer votre plateforme selon vos besoins."
  }
];

const TransformationSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-dark-black text-white border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-lime-accent font-bold tracking-wider uppercase text-sm mb-2 block">Comment nous travaillons</span>
            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6 leading-tight">Notre méthodologie pour des projets web performants</h2>
            <p className="text-gray-400 mb-8 text-lg">
              Notre processus est conçu pour sécuriser votre investissement digital et maximiser la valeur créée à chaque étape.
            </p>
            <p className="text-gray-500 mb-12">
              Chez Wendooka, nous suivons un processus rigoureux et transparent pour transformer vos idées en solutions digitales performantes.
            </p>
            <div className="space-y-10">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-6 group">
                  <div className="flex-shrink-0 bg-dark-gray p-4 rounded-2xl group-hover:bg-lime-accent group-hover:text-dark-black transition-all">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 transition-colors group-hover:text-lime-accent">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-lime-accent/10 rounded-3xl blur-3xl transform -rotate-3"></div>
            <img
              src="/271248.webp"
              alt="Notre méthodologie de travail"
              className="relative rounded-3xl w-full h-auto object-cover shadow-2xl border border-gray-800"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;