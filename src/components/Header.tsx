import React from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react';

const Header: React.FC = () => {
  const navLinks = ["Accueil", "Services", "Réalisations", "Contact", "A Propos"];

  return (
    <header className="sticky top-0 z-50 w-full bg-dark-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <a href="/" className="flex items-center gap-2">
          <img src="/public/placeholder.svg" alt="Wendooka Logo" className="h-8 w-8 filter invert" />
          <span className="text-2xl font-bold font-poppins text-white">Wendooka</span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link} href="#" className="text-gray-300 hover:text-lime-accent transition-colors">
              {link}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button className="hidden md:inline-flex bg-dark-gray text-white hover:bg-gray-800 border border-gray-700">
            Obtenir un Devis
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden text-white">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;