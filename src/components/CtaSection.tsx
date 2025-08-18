import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';

const CtaSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-dark-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins">🤝 Prêt à créer quelque chose de grand ?</h2>
            <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">Vous avez un projet web en tête ? Notre équipe est prête à transformer votre vision en réalité. Contactez-nous pour obtenir un devis personnalisé et découvrir comment nous pouvons propulser votre présence en ligne.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <form className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input type="text" placeholder="Nom *" className="bg-dark-gray border-gray-700 h-12 rounded-lg" />
              <Input type="email" placeholder="Email *" className="bg-dark-gray border-gray-700 h-12 rounded-lg" />
            </div>
            <Input type="tel" placeholder="Téléphone *" className="bg-dark-gray border-gray-700 h-12 rounded-lg" />
            <Input type="text" placeholder="Besoin *" className="bg-dark-gray border-gray-700 h-12 rounded-lg" />
            <Textarea placeholder="Message *" className="bg-dark-gray border-gray-700 rounded-lg min-h-[150px]" />
            <Button className="bg-lime-accent text-dark-black hover:bg-lime-accent/90 font-bold rounded-full px-8 py-4 text-lg w-full">
              Obtenir mon devis gratuit
            </Button>
          </form>
          <div className="bg-lime-accent text-dark-black p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6">Informations de contact</h3>
            <div className="space-y-4">
              <a href="#" className="flex items-center gap-4 group">
                <MapPin className="h-6 w-6" />
                <span className="group-hover:underline">Carrefour Cinéma Adamaoua, Ngaoundéré</span>
              </a>
              <a href="tel:+237672051289" className="flex items-center gap-4 group">
                <Phone className="h-6 w-6" />
                <span className="group-hover:underline">+237 672 05 12 89</span>
              </a>
              <a href="https://wa.me/237620706681" className="flex items-center gap-4 group">
                <MessageSquare className="h-6 w-6" />
                <span className="group-hover:underline">+237 620 70 66 81 (WhatsApp)</span>
              </a>
              <a href="mailto:contact@wendooka.com" className="flex items-center gap-4 group">
                <Mail className="h-6 w-6" />
                <span className="group-hover:underline">contact@wendooka.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;