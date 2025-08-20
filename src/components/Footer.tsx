import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Réalisations", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
    { name: "A Propos", href: "/#about" },
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5 text-dark-black" />, href: "#" },
    { icon: <Twitter className="h-5 w-5 text-dark-black" />, href: "#" },
    { icon: <Instagram className="h-5 w-5 text-dark-black" />, href: "#" },
    { icon: <Linkedin className="h-5 w-5 text-dark-black" />, href: "#" },
  ];

  return (
    <footer className="bg-dark-black text-gray-400">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="bg-lime-accent rounded-full p-2 flex items-center justify-center">
                <img src="/public/placeholder.svg" alt="Wendooka Logo" className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold font-poppins text-white">Wendooka</span>
            </Link>
            <p className="max-w-md mb-6">
              Une agence de web design créative et dynamique qui aide les clients à réussir en ligne.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} className="bg-lime-accent rounded-full p-2 hover:bg-lime-accent/90 transition-colors">
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-lime-accent mb-4 font-poppins">Navigation</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('/') && !link.href.startsWith('/#') ? (
                    <Link to={link.href} className="hover:text-lime-accent transition-colors">{link.name}</Link>
                  ) : (
                    <a href={link.href} className="hover:text-lime-accent transition-colors">{link.name}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-lime-accent mb-4 font-poppins">Contact</h3>
            <address className="not-italic space-y-3">
              <p>Ngaoundéré, Cameroun</p>
              <a href="mailto:contact@wendooka.com" className="block hover:text-lime-accent transition-colors">contact@wendooka.com</a>
              <a href="tel:+237672051289" className="block hover:text-lime-accent transition-colors">+237 672 05 12 89</a>
            </address>
          </div>

          <div>
            <h3 className="text-lg font-bold text-lime-accent mb-4 font-poppins">Recevez les dernières informations</h3>
            <form className="flex items-center rounded-full bg-dark-gray p-1">
              <Input type="email" placeholder="Votre email" className="bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-gray-500 flex-grow" />
              <Button type="submit" size="icon" className="bg-lime-accent text-dark-black rounded-full flex-shrink-0 hover:bg-lime-accent/90">
                <ArrowRight className="h-5 w-5" />
              </Button>
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