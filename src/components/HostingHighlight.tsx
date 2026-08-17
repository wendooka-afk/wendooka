import React from 'react';
import { Link } from 'react-router-dom';
import { Server, ArrowRight, Check } from 'lucide-react';

const POINTS = [
  'Ressources serveur garanties, jamais de mutualisé',
  'Email professionnel, SSL et sauvegardes quotidiennes inclus',
  'Paiement Orange Money et MTN Mobile Money',
  'Migration de votre site actuel prise en charge',
];

const HostingHighlight: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-dark-black">
      <div className="container mx-auto px-4">
        <div className="bg-dark-gray border border-gray-800 rounded-3xl p-8 md:p-14 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-lime-accent text-dark-black text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                Nouveau
              </span>
              <span className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                <Server className="h-4 w-4 text-lime-accent" />
                Hébergement web
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-5 leading-tight">
              Nous hébergeons aussi votre site, dès 6 500 FCFA par mois
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Wendooka ne se contente plus de construire votre site : nous l'exploitons sur notre
              infrastructure cloud VPS, sur serveurs européens. Un seul interlocuteur pour la conception,
              la mise en ligne et l'hébergement.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                to="/hebergement-web-cameroun"
                className="inline-flex items-center justify-center gap-2 bg-lime-accent text-dark-black font-bold py-4 px-8 rounded-full hover:opacity-90 transition-opacity"
              >
                Découvrir nos plans <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border border-gray-600 text-white font-bold py-4 px-8 rounded-full hover:border-lime-accent hover:text-lime-accent transition-colors"
              >
                Migrer mon site
              </Link>
            </div>
          </div>

          <ul className="space-y-5 lg:border-l lg:border-gray-800 lg:pl-16">
            {POINTS.map((point) => (
              <li key={point} className="flex gap-4 text-gray-300 text-lg leading-relaxed">
                <Check className="h-6 w-6 text-lime-accent shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HostingHighlight;
