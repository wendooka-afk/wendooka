import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import FaqSection from '@/components/FaqSection';
import { ContactForm } from '@/components/ContactForm';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-dark-black text-white">
      <Header />
      <main>
        <section className="py-20 md:py-32 text-center bg-dark-black">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-4">Contactez-nous</h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Une question ? Un projet en tête ? N'hésitez pas à nous contacter. Nous sommes là pour vous aider à concrétiser vos idées.
            </p>
            <p className="text-lg text-gray-400 mt-4">
              <Link to="/" className="hover:text-lime-accent">Accueil</Link> / <span className="text-white">Contact</span>
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-dark-gray">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="bg-dark-black p-8 rounded-2xl">
                <h2 className="text-3xl font-bold font-poppins mb-6">Laissez-nous un message</h2>
                <p className="text-gray-400 mb-8">
                  Remplissez le formulaire et notre équipe vous répondra dans les plus brefs délais.
                </p>
                <ContactForm />
              </div>
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold font-poppins mb-6">Nos coordonnées</h2>
                  <p className="text-gray-400 mb-8">
                    Vous pouvez également nous contacter directement via les informations ci-dessous.
                  </p>
                </div>
                <div className="space-y-6">
                  <a href="tel:+237672051289" className="flex items-start gap-4 group">
                    <div className="bg-lime-accent text-dark-black rounded-full p-3">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-lime-accent transition-colors">Téléphone</h3>
                      <p className="text-gray-400">+237 672 05 12 89</p>
                    </div>
                  </a>
                  <a href="mailto:contact@wendooka.com" className="flex items-start gap-4 group">
                    <div className="bg-lime-accent text-dark-black rounded-full p-3">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-lime-accent transition-colors">Email</h3>
                      <p className="text-gray-400">contact@wendooka.com</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-4">
                    <div className="bg-lime-accent text-dark-black rounded-full p-3">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Adresse</h3>
                      <p className="text-gray-400">Carrefour Cinéma Adamaoua, Ngaoundéré, Cameroun</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-lime-accent text-dark-black rounded-full p-3">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Heures d'ouverture</h3>
                      <p className="text-gray-400">Lundi - Vendredi : 9h00 - 18h00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FaqSection />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;