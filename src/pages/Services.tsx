import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Globe, Palette, Megaphone, ShoppingCart, Wrench, ArrowRight, Phone, Mail, MapPin, Clock, LayoutTemplate, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import MarqueeSection from '@/components/MarqueeSection';

const services = [
  {
    slug: "creation-de-sites-web",
    icon: <Globe className="h-10 w-10 text-lime-accent" />,
    title: "Création de sites web",
    description: "Nous créons des sites web sur mesure qui captent l’essence de votre marque et répondent à vos objectifs commerciaux."
  },
  {
    slug: "design-graphique",
    icon: <Palette className="h-10 w-10 text-lime-accent" />,
    title: "Design graphique",
    description: "Notre équipe de designers mettra en valeur votre identité de marque en créant des designs percutants et mémorables."
  },
  {
    slug: "ui-ux-design",
    icon: <LayoutTemplate className="h-10 w-10 text-lime-accent" />,
    title: "UI/UX Design",
    description: "Expériences fluides et intuitives qui fidélisent vos utilisateurs."
  },
  {
    slug: "marketing-digital",
    icon: <Megaphone className="h-10 w-10 text-lime-accent" />,
    title: "Marketing digital",
    description: "Nous élaborons des stratégies personnalisées pour générer du trafic qualifié et convertir les visiteurs en clients fidèles."
  },
  {
    slug: "e-commerce",
    icon: <ShoppingCart className="h-10 w-10 text-lime-accent" />,
    title: "E-commerce",
    description: "Solutions personnalisées avec paniers d’achat, paiements en ligne et intégrations de systèmes de gestion des stocks."
  },
  {
    slug: "maintenance-support",
    icon: <Wrench className="h-10 w-10 text-lime-accent" />,
    title: "Maintenance et support",
    description: "Nous assurons que votre site web reste à jour et fonctionne de manière optimale, des mises à jour à la résolution de problèmes."
  }
];

const ServicesPage: React.FC = () => {
  return (
    <div className="bg-dark-black text-white">
      <Header />
      <main>
        <section className="py-20 md:py-32 text-center bg-dark-black">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-4">Nos Services</h1>
            <p className="text-lg text-gray-400">
              <Link to="/" className="hover:text-lime-accent">Accueil</Link> / <span className="text-white">Services</span>
            </p>
          </div>
        </section>

        <MarqueeSection />

        <section className="py-16 md:py-24 bg-white text-dark-black">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="bg-light-gray border-gray-200 rounded-2xl p-6 text-left flex flex-col hover:shadow-xl transition-shadow duration-300">
                  <div className="mb-6 bg-lime-accent text-dark-black rounded-full p-3 w-16 h-16 flex items-center justify-center">
                    {service.icon}
                  </div>
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-2xl font-bold font-poppins">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-grow">
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                  <Link to={`/services/${service.slug}`} className="mt-6 font-bold text-dark-black hover:underline flex items-center group">
                    Lire la suite <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-dark-gray">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">Trouvez la solution à votre problème</h2>
                <p className="text-gray-400 mb-4">
                  Faites confiance aux experts pour tous vos besoins de conception et de développement Web. Que vous ayez besoin d’un site vitrine élégant, d’une boutique en ligne conviviale, ou d’une plateforme personnalisée, nous avons les compétences pour répondre à vos exigences.
                </p>
                <p className="text-gray-400 mb-8">
                  Nous travaillons en étroite collaboration avec vous pour créer une expérience en ligne qui vous démarque de la concurrence, en utilisant les dernières technologies pour fournir des solutions à la fois esthétiques et performantes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-lime-accent text-dark-black hover:bg-lime-accent/90 font-bold rounded-full px-8 py-4 text-lg">
                    <Link to="/portfolio">Découvrez nos réalisations</Link>
                  </Button>
                </div>
              </div>
              <div className="bg-lime-accent text-dark-black p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6">Contactez-nous</h3>
                <p className="mb-6">
                  Notre équipe amicale et compétente est prête à vous aider. N'hésitez pas à nous contacter pour discuter de vos besoins ou obtenir un devis.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Clock className="h-6 w-6 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold">Heures d'ouverture</h4>
                      <p>Du lundi au vendredi : 9h00 - 18h00</p>
                      <p>Samedi et dimanche : Fermé</p>
                    </div>
                  </div>
                  <a href="tel:+237672051289" className="flex items-center gap-4 group">
                    <Phone className="h-6 w-6 flex-shrink-0" />
                    <span className="group-hover:underline">+237 672 05 12 89</span>
                  </a>
                  <a href="mailto:contact@wendooka.com" className="flex items-center gap-4 group">
                    <Mail className="h-6 w-6 flex-shrink-0" />
                    <span className="group-hover:underline">contact@wendooka.com</span>
                  </a>
                   <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 mt-1 flex-shrink-0" />
                    <span>Carrefour Cinéma Adamaoua, Ngaoundéré, Cameroun</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;