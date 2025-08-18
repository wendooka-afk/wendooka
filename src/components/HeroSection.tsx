import React from 'react';
import { Badge } from "@/components/ui/badge";

const HeroSection: React.FC = () => {
  const services = ["Mobile Application Development", "Website Development", "UX/UI Design", "Graphic Design", "Digital Marketing"];

  return (
    <section className="bg-dark-black text-white">
      <div className="container mx-auto px-4 pt-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3 text-center lg:text-left">
            <p className="text-lime-accent font-semibold mb-4">Award Wining Digital Agency</p>
            <h1 className="text-5xl md:text-7xl font-extrabold font-poppins leading-tight mb-6">
              Where Innovation Meets Digital Excellence
            </h1>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 my-8">
              {services.map(service => (
                <Badge key={service} variant="outline" className="border-gray-600 text-gray-300 py-2 px-4 rounded-full text-sm">
                  {service}
                </Badge>
              ))}
            </div>
            <p className="text-gray-400 text-lg max-w-xl mx-auto lg:mx-0">
              Chez Wendooka, nous créons des sites web sur mesure pour votre entreprise, afin de refléter votre identité de marque et vos besoins spécifiques.
            </p>
          </div>

          <div className="lg:col-span-2 hidden lg:flex items-center justify-center">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 border-2 border-dashed border-gray-600 rounded-full animate-spin-slow"></div>
              <img src="/public/placeholder.svg" alt="Hire Us" className="w-full h-full object-contain filter invert" />
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-24 relative">
          <img src="/public/placeholder.svg" alt="Wendooka Team" className="rounded-2xl w-full h-auto object-cover aspect-[16/9] lg:aspect-[2/1]" />
          <div className="absolute -bottom-8 right-4 md:bottom-8 md:right-8 bg-lime-accent text-dark-black p-6 md:p-8 rounded-2xl shadow-lg w-64 max-w-[90vw]">
            <div className="space-y-4">
              <div>
                <p className="text-4xl font-bold font-poppins">850+</p>
                <p>Projects Completed</p>
              </div>
              <div>
                <p className="text-4xl font-bold font-poppins">18+</p>
                <p>Years of Experience</p>
              </div>
              <div>
                <p className="text-4xl font-bold font-poppins">500+</p>
                <p>Happy Customers</p>
              </div>
            </div>
          </div>
          <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-dark-black/50 backdrop-blur-sm p-4 rounded-2xl flex items-center gap-4">
            <div className="flex -space-x-2">
              <img className="inline-block h-10 w-10 rounded-full ring-2 ring-dark-black" src="/public/placeholder.svg" alt="Reviewer 1"/>
              <img className="inline-block h-10 w-10 rounded-full ring-2 ring-dark-black" src="/public/placeholder.svg" alt="Reviewer 2"/>
              <img className="inline-block h-10 w-10 rounded-full ring-2 ring-dark-black" src="/public/placeholder.svg" alt="Reviewer 3"/>
            </div>
            <div>
              <p className="font-bold text-white">4.9 Star</p>
              <p className="text-gray-300 text-sm">Reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;