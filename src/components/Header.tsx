import React from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react';

const Header: React.FC = () => {
  const navLinks = ["Home", "Services", "Projects", "Blogs", "About Us"];

  return (
    <header className="sticky top-0 z-50 w-full bg-dark-black/80 backdrop-blur-sm border-b border-gray-800/50">
      <div className="container mx-auto flex h-24 items-center justify-between px-4 md:px-6">
        <a href="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 bg-lime-accent rounded-md">
            <div className="flex gap-1">
              <span className="w-1.5 h-5 bg-dark-black rounded-full"></span>
              <span className="w-1.5 h-5 bg-dark-black rounded-full"></span>
            </div>
          </div>
          <span className="text-2xl font-bold font-poppins text-white">Wendooka</span>
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link} href="#" className="text-gray-300 hover:text-lime-accent transition-colors text-base">
              {link}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button className="hidden lg:inline-flex bg-lime-accent text-dark-black hover:bg-lime-accent/90 rounded-full px-6 py-5 font-bold text-base">
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