import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from 'lucide-react';

const CtaSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-dark-black text-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-semibold text-lime-accent mb-2">Contactez-nous</p>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-8">Créons quelque chose de grand ensemble</h2>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input type="text" placeholder="Prénom *" className="bg-dark-gray border-gray-700 h-12 rounded-lg" />
                <Input type="text" placeholder="Nom *" className="bg-dark-gray border-gray-700 h-12 rounded-lg" />
              </div>
              <Input type="email" placeholder="Email *" className="bg-dark-gray border-gray-700 h-12 rounded-lg" />
              <Textarea placeholder="Message *" className="bg-dark-gray border-gray-700 rounded-lg min-h-[150px]" />
              <Button className="bg-lime-accent text-dark-black hover:bg-lime-accent/90 font-bold rounded-full px-8 py-4 text-lg">
                Envoyer le Message
              </Button>
            </form>
          </div>
          <div className="bg-lime-accent text-dark-black p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6">Informations de contact</h3>
            <div className="space-y-4">
              <a href="#" className="flex items-center gap-4 group">
                <MapPin className="h-6 w-6" />
                <span className="group-hover:underline">Carrefour Cinéma Adamaoua, Ngaoundéré, Cameroun</span>
              </a>
              <a href="tel:+237672051289" className="flex items-center gap-4 group">
                <Phone className="h-6 w-6" />
                <span className="group-hover:underline">+237 672 05 12 89</span>
              </a>
              <a href="mailto:contact@wendooka.com" className="flex items-center gap-4 group">
                <Mail className="h-6 w-6" />
                <span className="group-hover:underline">contact@wendooka.com</span>
              </a>
            </div>
            <div className="mt-8">
              <h4 className="font-bold mb-2">Heures d'ouverture :</h4>
              <p>Lundi - Vendredi : 9h00 - 18h00</p>
              <p>Samedi et Dimanche : Fermé</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;