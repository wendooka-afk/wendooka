import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Réalisations", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "A Propos", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderLink = (link: { name: string, href: string }, isMobile = false) => {
    const className = isMobile 
      ? "text-white hover:text-lime-accent transition-colors text-2xl font-medium"
      : "text-white hover:text-lime-accent transition-colors text-lg font-medium";

    if (link.href.startsWith('/') && !link.href.startsWith('/#')) {
      return (
        <Link key={link.name} to={link.href} className={className} onClick={isMobile ? toggleMenu : undefined}>
          {link.name}
        </Link>
      );
    }
    return (
      <a key={link.name} href={link.href} className={className} onClick={isMobile ? toggleMenu : undefined}>
        {link.name}
      </a>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-dark-black">
      <div className="container mx-auto flex h-24 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => isMenuOpen && toggleMenu()}>
          <div className="bg-lime-accent rounded-full p-2 flex items-center justify-center">
            <img src="/public/placeholder-logo.svg" alt="Wendooka Logo" className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold font-poppins text-white">Wendooka</span>
        </Link>
        
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => renderLink(link))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden lg:inline-flex bg-lime-accent text-dark-black hover:bg-lime-accent/90 rounded-full px-6 py-3 font-bold">
            <Link to="/contact">Je veux un devis</Link>
          </Button>
          
          <Button variant="ghost" size="icon" className="lg:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-24 left-0 w-full bg-dark-black h-screen">
          <nav className="flex flex-col items-center gap-8 pt-16">
            {navLinks.map(link => renderLink(link, true))}
            <Button asChild className="mt-8 bg-lime-accent text-dark-black hover:bg-lime-accent/90 rounded-full px-8 py-4 font-bold text-lg">
              <Link to="/contact">Je veux un devis</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;