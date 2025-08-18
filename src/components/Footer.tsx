import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Footer: React.FC = () => {
  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Réalisations", href: "/#portfolio" },
    { name: "Contact", href: "/#contact" },
    { name: "A Propos", href: "/#about" },
  ];

  return (
    <footer className="bg-dark-black text-gray-400 border-t border-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <a href="/" className="flex items-center gap-2 mb-4">
              <img src="/public/placeholder.svg" alt="Wendooka Logo" className="h-10 w-10 filter invert" />
              <span className="text-2xl font-bold font-poppins text-white">Wendooka</span>
            </a>
            <p className="max-w-md">
              Une agence de web design créative et dynamique qui aide les clients à réussir en ligne.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}><a href={link.href} className="hover:text-lime-accent transition-colors">{link.name}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact</h3>
            <address className="not-italic space-y-2">
              <p>Ngaoundéré, Cameroun</p>
              <a href="mailto:contact@wendooka.com" className="hover:text-lime-accent transition-colors">contact@wendooka.com</a>
              <br />
              <a href="tel:+237672051289" className="hover:text-lime-accent transition-colors">+237 672 05 12 89</a>
            </address>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Recevez les dernières informations</h3>
            <form className="flex gap-2">
              <Input type="email" placeholder="Votre email" className="bg-dark-gray border-gray-700 rounded-full" />
              <Button type="submit" className="bg-lime-accent text-dark-black rounded-full p-3 aspect-square hover:bg-lime-accent/90">→</Button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p>&copy;{new Date().getFullYear()} Wendooka Ltd. Tous Droits Réservés.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white">Conditions d'utilisation</a>
            <a href="#" className="hover:text-white">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;