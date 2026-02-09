import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import FaqSection from '@/components/FaqSection';
import { ContactForm } from '@/components/ContactForm';

const ContactPage: React.FC = () => {
  React.useEffect(() => {
    document.title = "Contact & devis projet digital | Wendooka";
    const metaDescription = document.querySelector('meta[name="description"]');
    const content = "Contactez Wendooka pour discuter de votre projet web, applicatif ou marketing digital et obtenir un devis personnalisé.";
    if (metaDescription) {
      metaDescription.setAttribute("content", content);
    }
  }, []);

  return (
    <div className="bg-dark-black text-white">
      <Header />
      <main>
        {/* Updated Hero Section */}
        <section className="relative py-24 md:py-40 text-center bg-cover bg-center" style={{ backgroundImage: `url('/271248.webp')` }}>
          <div className="absolute inset-0 bg-dark-black/85 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-7xl font-bold font-poppins mb-6">Parlons de votre projet digital</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
              Vous avez un projet web, applicatif ou marketing ? Présentez-nous votre besoin et échangeons sur la meilleure solution pour atteindre vos objectifs.
            </p>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-dark-gray/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-12 gap-16 items-start">

              {/* Form Side with Qualification Text */}
              <div className="lg:col-span-8 bg-dark-black p-10 md:p-14 rounded-3xl border border-gray-800 shadow-2xl">
                <div className="mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">Avant de nous contacter</h2>
                  <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
                    Wendooka accompagne des projets digitaux structurés, avec des objectifs clairs et une vision long terme. Afin de pouvoir vous répondre efficacement, merci de nous fournir un maximum d’informations sur votre projet.
                  </p>
                </div>
                <ContactForm />
              </div>

              {/* Sidebar Coordonnées */}
              <div className="lg:col-span-4 space-y-12">
                <div>
                  <h2 className="text-3xl font-bold font-poppins mb-6">Nous contacter directement</h2>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    Pour toute demande structurée, nous privilégions le formulaire. Vous pouvez également nous joindre via les coordonnées ci-dessous.
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