import React from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react';

const Header: React.FC = () => {
  const navLinks = ["Accueil", "Services", "Réalisations", "Contact", "A Propos"];

  return (
    <header className="sticky top-0 z-50 w-full bg-dark-black/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-24 items-center justify-between px-4 md:px-6">
        <a href="/" className="flex items-center gap-2">
          <img src="/public/placeholder.svg" alt="Wendooka Logo" className="h-10 w-10 filter invert" />
          <span className="text-2xl font-bold font-poppins text-white">Wendooka</span>
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link} href="#" className="text-gray-300 hover:text-lime-accent transition-colors text-lg">
              {link}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button className="hidden lg:inline-flex bg-lime-accent text-dark-black hover:bg-lime-accent/90 rounded-full px-6 py-3 font-bold">
            Let's Talk
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden text-white">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;