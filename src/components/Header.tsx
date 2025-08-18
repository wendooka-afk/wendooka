import React from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Réalisations", href: "/#portfolio" },
    { name: "Contact", href: "/#contact" },
    { name: "A Propos", href: "/#about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-dark-black">
      <div className="container mx-auto flex h-24 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-lime-accent rounded-full p-2 flex items-center justify-center">
            <img src="/public/placeholder.svg" alt="Wendooka Logo" className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold font-poppins text-white">Wendooka</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-white hover:text-lime-accent transition-colors text-lg font-medium">
              {link.name}
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