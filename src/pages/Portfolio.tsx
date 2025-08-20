import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import GlobalCta from '@/components/GlobalCta';

const PortfolioPage: React.FC = () => {
  return (
    <div className="bg-dark-black text-white">
      <Header />
      <main>
        <section className="py-20 md:py-32 text-center bg-dark-black">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-4">Nos Réalisations</h1>
            <p className="text-lg text-gray-400">
              <Link to="/" className="hover:text-lime-accent">Accueil</Link> / <span className="text-white">Réalisations</span>
            </p>
          </div>
        </section>
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl font-bold mb-4">Page en construction</h2>
                <p className="text-gray-400">Notre portfolio complet sera bientôt disponible ici.</p>
            </div>
        </section>
        <GlobalCta />
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioPage;