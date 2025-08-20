import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { servicesData } from '@/data/services';
import { Button } from '@/components/ui/button';

const ServiceDetailPage: React.FC = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const service = servicesData.find(s => s.slug === serviceSlug);

  if (!service) {
    // Redirect to a 404 page if the service slug is not found
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="bg-dark-black text-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 text-center bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(11, 11, 11, 0.7), rgba(11, 11, 11, 0.7)), url(${service.heroImage})` }}>
          <div className="container mx-auto px-4 z-10 relative">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-4">{service.title}</h1>
            <p className="text-lg text-gray-300">
              <Link to="/" className="hover:text-lime-accent">Accueil</Link> / <Link to="/services" className="hover:text-lime-accent">Services</Link> / <span className="text-white">{service.title}</span>
            </p>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-16 md:py-24 bg-dark-gray">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <img src={service.intro.image} alt={service.intro.title} className="rounded-2xl w-full h-auto object-cover aspect-video" />
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">{service.intro.title}</h2>
                {service.intro.text.map((p, i) => <p key={i} className="text-gray-400 mb-4">{p}</p>)}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-dark-black">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-12">Ce que vous obtenez</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.features.map((feature, index) => (
                <div key={index} className="bg-dark-gray p-8 rounded-2xl text-left flex flex-col">
                  <div className="text-lime-accent mb-4">{React.cloneElement(feature.icon, { className: 'h-10 w-10' })}</div>
                  <h3 className="text-xl font-bold mb-2 flex-grow">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 md:py-24 bg-dark-gray">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-poppins">Notre processus</h2>
                    <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">Nous suivons une approche structurée pour garantir la réussite de chaque projet.</p>
                </div>
                <div className="relative max-w-5xl mx-auto">
                    <div className="absolute top-8 left-0 w-full h-0.5 bg-gray-700 hidden md:block" aria-hidden="true"></div>
                    <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
                        {service.process.map((step, index) => (
                            <div key={index} className="relative flex flex-col items-center text-center">
                                <div className="z-10 bg-lime-accent text-dark-black h-16 w-16 rounded-full flex items-center justify-center font-bold text-2xl mb-4 border-4 border-dark-gray">{index + 1}</div>
                                <h3 className="text-xl font-bold mb-2">{step.name}</h3>
                                <p className="text-gray-400">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-lime-accent text-dark-black">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Prêt à lancer votre projet ?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">Contactez-nous dès aujourd'hui pour discuter de vos besoins et obtenir un devis gratuit.</p>
            <Button asChild className="bg-dark-black text-white hover:bg-gray-800 font-bold rounded-full px-8 py-4 text-lg">
              <a href="/#contact">Demander un devis gratuit</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetailPage;