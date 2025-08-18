import React from 'react';
import { Star } from 'lucide-react';

const ServicesTicker: React.FC = () => {
  const services = ["Design", "Website Design", "UX/UI Design", "Graphics Design", "Digital Marketing", "Mobile App Development", "SEO"];
  const tickerItems = [...services, ...services, ...services];

  return (
    <div className="bg-lime-accent py-4 overflow-hidden whitespace-nowrap">
      <div className="inline-block animate-marquee">
        {tickerItems.map((service, index) => (
          <div key={index} className="inline-flex items-center gap-4 mx-6">
            <Star className="h-5 w-5 text-dark-black" fill="currentColor" />
            <span className="text-lg font-bold text-dark-black uppercase tracking-wider">{service}</span>
          </div>
        ))}
      </div>
      <div className="inline-block animate-marquee">
        {tickerItems.map((service, index) => (
          <div key={index} className="inline-flex items-center gap-4 mx-6">
            <Star className="h-5 w-5 text-dark-black" fill="currentColor" />
            <span className="text-lg font-bold text-dark-black uppercase tracking-wider">{service}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesTicker;