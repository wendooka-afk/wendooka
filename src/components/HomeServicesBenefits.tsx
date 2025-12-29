import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Globe, Smartphone, Palette, Layout, Megaphone, Wrench, Code } from 'lucide-react';

const items = [
  {
    icon: <Globe className="h-7 w-7 text-dark-black" />,
    title: "Création de sites web",
    desc: "Des sites vitrines et e-commerce modernes, optimisés pour générer des ventes et inspirer confiance."
  },
  {
    icon: <Code className="h-7 w-7 text-dark-black" />,
    title: "Développement Web",
    desc: "Développement de solutions web personnalisées pour répondre à vos besoins spécifiques."
  },
  {
    icon: <Smartphone className="h-7 w-7 text-dark-black" />,
    title: "Développement Web & Mobile",
    desc: "Des applications web et mobiles pour vos business."
  },
  {
    icon: <Palette className="h-7 w-7 text-dark-black" />,
    title: "Design graphique",
    desc: "Identités visuelles fortes, logos percutants et visuels qui marquent les esprits."
  },
  {
    icon: <Layout className="h-7 w-7 text-dark-black" />,
    title: "UI/UX Design",
    desc: "Expériences fluides et intuitives qui fidélisent vos utilisateurs."
  },
  {
    icon: <Megaphone className="h-7 w-7 text-dark-black" />,
    title: "Marketing digital",
    desc: "Campagnes ciblées qui boostent votre visibilité et vos conversions."
  },
  {
    icon: <Wrench className="h-7 w-7 text-dark-black" />,
    title: "Maintenance & support",
    desc: "Un suivi complet pour assurer la performance et la sécurité de votre site."
  },
];

const HomeServicesBenefits: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white text-dark-black">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="font-semibold mb-2">Nos solutions digitales</p>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
            Découvrez nos solutions digitales sur-mesure
          </h2>
          <p className="text-lg text-gray-600">
            Nous combinons stratégie, créativité et technologie pour offrir des solutions qui répondent à vos besoins réels et vous démarquent de la concurrence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {items.map((item) => (
            <div 
              key={item.title} 
              className="bg-light-gray rounded-2xl p-6 flex gap-4 items-start border border-gray-200"
            >
              <div className="bg-lime-accent rounded-full p-3 flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button 
            asChild 
            className="bg-dark-black text-white hover:bg-gray-800 font-bold rounded-full px-8 py-4 text-lg"
          >
            <Link to="/services">Découvrir nos services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomeServicesBenefits;