import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Globe, Smartphone, Palette, Layout, Megaphone, Wrench, Code } from 'lucide-react';

const items = [
  {
    icon: <Globe className="h-7 w-7 text-dark-black" />,
    title: "Création de sites web",
    slug: "creation-sites-web",
    desc: "Sites vitrines et e-commerce sur-mesure, pensés pour convertir et renforcer votre crédibilité."
  },
  {
    icon: <Code className="h-7 w-7 text-dark-black" />,
    title: "Développement web sur-mesure",
    slug: "developpement-web",
    desc: "Applications web, plateformes SaaS et solutions métiers robustes et scalables."
  },
  {
    icon: <Layout className="h-7 w-7 text-dark-black" />,
    title: "UI/UX Design",
    slug: "ui-ux-design",
    desc: "Interfaces centrées utilisateur pour améliorer l’expérience et la performance."
  },
  {
    icon: <Palette className="h-7 w-7 text-dark-black" />,
    title: "Design graphique",
    slug: "design-graphique",
    desc: "Identités visuelles fortes et cohérentes pour marques ambitieuses."
  },
  {
    icon: <Megaphone className="h-7 w-7 text-dark-black" />,
    title: "Marketing digital",
    slug: "marketing-digital",
    desc: "SEO business, publicité en ligne et stratégies d’acquisition orientées ROI."
  },
];

const HomeServicesBenefits: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white text-dark-black">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-lime-accent font-bold tracking-wider uppercase text-sm mb-2 block">Nos Solutions</span>
          <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">
            Nos expertises web au service de votre croissance
          </h2>
          <p className="text-lg text-gray-600">
            Nous combinons stratégie, créativité et technologie pour offrir des solutions qui répondent à vos besoins réels et vous démarquent de la concurrence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {items.map((item) => (
            <Link
              key={item.title}
              to={`/services/${item.slug}`}
              className="bg-light-gray rounded-2xl p-6 flex gap-4 items-start border border-gray-200 hover:border-lime-accent hover:shadow-xl transition-all duration-300 group"
            >
              <div className="bg-lime-accent rounded-full p-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1 group-hover:text-lime-600 transition-colors">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button
            asChild
            variant="default" // Lime accent
            size="lg"
          >
            <Link to="/services">Découvrir nos services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomeServicesBenefits;