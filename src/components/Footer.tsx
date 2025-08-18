import React from 'react';
import { Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-black text-gray-400 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <img src="/public/placeholder.svg" alt="Wendooka Logo" className="h-8 w-8 filter invert" />
              <span className="text-2xl font-bold font-poppins text-white">Wendooka</span>
            </a>
            <p className="max-w-md">
              Wendooka est une agence de web design créative et dynamique. Nous offrons des services de création de sites web, de design graphique et de marketing digital pour aider nos clients à réussir en ligne.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-lime-accent transition-colors">Accueil</a></li>
              <li><a href="#" className="hover:text-lime-accent transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-lime-accent transition-colors">Réalisations</a></li>
              <li><a href="#" className="hover:text-lime-accent transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-lime-accent transition-colors">A Propos</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contactez-nous</h3>
            <address className="not-italic space-y-2">
              <p>Carrefour Cinéma Adamaoua, Ngaoundéré, Cameroun</p>
              <a href="mailto:contact@wendooka.com" className="flex items-center gap-2 hover:text-lime-accent transition-colors">
                <Mail className="h-4 w-4" /> contact@wendooka.com
              </a>
              <a href="tel:+237672051289" className="flex items-center gap-2 hover:text-lime-accent transition-colors">
                <Phone className="h-4 w-4" /> +237 672 05 12 89
              </a>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy;{new Date().getFullYear()} Wendooka Ltd. Tous Droits Réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;