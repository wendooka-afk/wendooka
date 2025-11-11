import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlobalCta from '@/components/GlobalCta';
import { Link } from 'react-router-dom';
import { CheckCircle, Users, Target, Lightbulb } from 'lucide-react';
import { teamData } from '@/data/team';
import { Card, CardContent } from '@/components/ui/card';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-dark-black text-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32 text-center bg-dark-gray">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-4">À Propos de Wendooka</h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Nous sommes plus qu'une agence. Nous sommes votre partenaire stratégique pour la croissance digitale.
            </p>
            <p className="text-lg text-gray-400 mt-4">
              <Link to="/" className="hover:text-lime-accent">Accueil</Link> / <span className="text-white">À Propos</span>
            </p>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img src="/60349.webp" alt="L'équipe Wendooka en réunion" className="rounded-2xl w-full h-auto object-cover" />
              </div>
              <div>
                <p className="font-semibold text-lime-accent mb-2">Notre Mission</p>
                <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">Transformer les idées en impact digital.</h2>
                <p className="text-gray-400 mb-6 text-lg">
                  Depuis plus de 10 ans, Wendooka accompagne entreprises, institutions et entrepreneurs dans la réussite de leurs projets en ligne. Notre mission est de concevoir et développer des solutions digitales performantes, esthétiques et centrées sur l'utilisateur, qui génèrent un impact concret et mesurable pour nos clients.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-lg"><CheckCircle className="h-6 w-6 text-lime-accent" /><span>Innovation constante</span></li>
                  <li className="flex items-center gap-3 text-lg"><CheckCircle className="h-6 w-6 text-lime-accent" /><span>Partenariat et transparence</span></li>
                  <li className="flex items-center gap-3 text-lg"><CheckCircle className="h-6 w-6 text-lime-accent" /><span>Excellence et qualité</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-dark-gray">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-12">Nos Valeurs Fondamentales</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-dark-black p-8 rounded-2xl">
                        <Users className="h-12 w-12 text-lime-accent mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Centré sur le Client</h3>
                        <p className="text-gray-400">Votre succès est notre succès. Nous nous immergons dans vos défis pour y apporter les meilleures solutions.</p>
                    </div>
                    <div className="bg-dark-black p-8 rounded-2xl">
                        <Target className="h-12 w-12 text-lime-accent mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Orienté Résultats</h3>
                        <p className="text-gray-400">Nous ne livrons pas seulement un produit, nous livrons des résultats. Chaque projet est mesuré par son impact.</p>
                    </div>
                    <div className="bg-dark-black p-8 rounded-2xl">
                        <Lightbulb className="h-12 w-12 text-lime-accent mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Créativité & Passion</h3>
                        <p className="text-gray-400">La passion pour notre métier nous pousse à innover et à repousser les limites de la créativité à chaque projet.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-12">Rencontrez Notre Équipe</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {teamData.map((member, index) => (
                <Card key={index} className="bg-dark-gray border-gray-800 text-center rounded-2xl p-6">
                  <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-lime-accent" />
                  <CardContent className="p-0">
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-lime-accent font-semibold mb-2">{member.role}</p>
                    <p className="text-gray-400 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <GlobalCta />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;