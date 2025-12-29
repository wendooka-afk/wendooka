import Marquee from "./Marquee";

const MarqueeSection = () => {
  const services = [
    "Création de sites web", 
    "Développement Web",
    "UI/UX Design", 
    "Design Graphique", 
    "Marketing Digital"
  ];

  return (
    <div className="bg-lime-accent text-dark-black py-4 overflow-hidden">
      <Marquee>
        <div className="flex items-center gap-8 mx-4">
          {services.map((service) => (
            <div key={service} className="flex items-center gap-8">
              <p className="text-xl font-bold whitespace-nowrap">{service}</p>
              <span className="text-2xl font-bold">*</span>
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default MarqueeSection;