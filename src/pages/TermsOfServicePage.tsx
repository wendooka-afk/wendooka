import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="bg-dark-black text-white">
      <Header />
      <main>
        <section className="py-20 md:py-32 text-center bg-dark-gray">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-4">Conditions d'utilisation</h1>
            <p className="text-lg text-gray-400 mt-4">
              <Link to="/" className="hover:text-lime-accent">Accueil</Link> / <span className="text-white">Conditions d'utilisation</span>
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl prose prose-invert prose-lg">
            <h2>1. Introduction</h2>
            <p>Bienvenue sur Wendooka. En accédant à notre site web et en utilisant nos services, vous acceptez d'être lié par les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site ou nos services.</p>

            <h2>2. Services</h2>
            <p>Wendooka fournit des services de création de sites web, de design graphique, d'UI/UX design, de marketing digital, de maintenance et de création de contenu. Les détails spécifiques de chaque service sont décrits sur les pages dédiées de notre site.</p>

            <h2>3. Propriété Intellectuelle</h2>
            <p>Tout le contenu présent sur ce site, y compris les textes, images, logos, graphiques, vidéos et code, est la propriété de Wendooka ou de ses concédants de licence et est protégé par les lois sur la propriété intellectuelle. Toute reproduction, distribution, modification ou utilisation sans autorisation écrite préalable est strictement interdite.</p>

            <h2>4. Comportement de l'utilisateur</h2>
            <p>Vous vous engagez à utiliser notre site et nos services de manière légale et respectueuse. Il est interdit de :</p>
            <ul>
              <li>Publier ou transmettre du contenu illégal, diffamatoire, obscène ou offensant.</li>
              <li>Tenter d'accéder sans autorisation à nos systèmes ou à d'autres comptes.</li>
              <li>Perturber le fonctionnement du site ou des services.</li>
            </ul>

            <h2>5. Limitation de Responsabilité</h2>
            <p>Wendooka s'efforce de maintenir les informations de ce site à jour et exactes, mais ne garantit pas leur exhaustivité ou leur exactitude. Nous ne serons pas responsables des dommages directs, indirects, accessoires, consécutifs ou punitifs résultant de votre accès ou de votre utilisation de notre site ou de nos services.</p>

            <h2>6. Modifications des Conditions</h2>
            <p>Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. Les modifications prendront effet dès leur publication sur le site. Il est de votre responsabilité de consulter régulièrement ces conditions pour prendre connaissance des éventuelles mises à jour.</p>

            <h2>7. Droit Applicable et Juridiction</h2>
            <p>Les présentes conditions sont régies par le droit camerounais. Tout litige relatif à l'interprétation ou à l'exécution de ces conditions sera soumis à la compétence exclusive des tribunaux de Ngaoundéré, Cameroun.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfServicePage;