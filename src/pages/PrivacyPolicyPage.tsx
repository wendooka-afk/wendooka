import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-dark-black text-white">
      <Header />
      <main>
        <section className="relative py-20 md:py-32 text-center bg-cover bg-center" style={{ backgroundImage: `url('/46018.webp')` }}>
          <div className="absolute inset-0 bg-dark-black/80 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-4">Politique de confidentialité</h1>
            <p className="text-lg text-gray-300 mt-4">
              <Link to="/" className="hover:text-lime-accent">Accueil</Link> / <span className="text-white">Politique de confidentialité</span>
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl prose prose-invert prose-lg">
            <h2>1. Introduction</h2>
            <p>Chez Wendooka, nous nous engageons à protéger la confidentialité de vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous visitez notre site web ou utilisez nos services.</p>

            <h2>2. Collecte des Informations</h2>
            <p>Nous collectons des informations de différentes manières, notamment :</p>
            <ul>
              <li>**Informations que vous nous fournissez** : Lorsque vous remplissez un formulaire de contact, vous vous inscrivez à notre newsletter, ou communiquez avec nous, nous pouvons collecter des informations telles que votre nom, adresse e-mail, numéro de téléphone et le contenu de votre message.</li>
              <li>**Données de navigation** : Nous collectons automatiquement certaines informations sur votre appareil et votre utilisation de notre site, y compris votre adresse IP, le type de navigateur, les pages visitées, les heures d'accès et les liens cliqués.</li>
            </ul>

            <h2>3. Utilisation des Informations</h2>
            <p>Nous utilisons les informations collectées pour :</p>
            <ul>
              <li>Fournir et améliorer nos services.</li>
              <li>Répondre à vos demandes et questions.</li>
              <li>Vous envoyer des communications marketing (si vous y avez consenti).</li>
              <li>Analyser l'utilisation de notre site pour en améliorer la performance et l'expérience utilisateur.</li>
              <li>Assurer la sécurité de notre site et prévenir la fraude.</li>
            </ul>

            <h2>4. Partage des Informations</h2>
            <p>Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers. Nous pouvons partager vos informations avec :</p>
            <ul>
              <li>Des prestataires de services tiers qui nous aident à exploiter notre site web et à fournir nos services (par exemple, hébergement, analyse de données).</li>
              <li>Les autorités légales si la loi l'exige.</li>
            </ul>

            <h2>5. Cookies</h2>
            <p>Notre site utilise des cookies pour améliorer votre expérience de navigation. Les cookies sont de petits fichiers texte stockés sur votre appareil. Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela pourrait affecter certaines fonctionnalités du site.</p>

            <h2>6. Sécurité des Données</h2>
            <p>Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles contre l'accès non autorisé, la divulgation, l'altération ou la destruction.</p>

            <h2>7. Vos Droits</h2>
            <p>Conformément à la législation applicable, vous avez le droit d'accéder à vos données personnelles, de les rectifier, de demander leur suppression ou de vous opposer à leur traitement. Pour exercer ces droits, veuillez nous contacter à contact@wendooka.com.</p>

            <h2>8. Modifications de la Politique de Confidentialité</h2>
            <p>Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Toute modification sera publiée sur cette page avec une date de révision. Nous vous encourageons à consulter régulièrement cette politique pour rester informé de nos pratiques en matière de confidentialité.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;