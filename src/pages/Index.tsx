import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesTicker from "@/components/ServicesTicker";

const Index = () => {
  return (
    <div className="bg-dark-black">
      <Header />
      <main>
        <HeroSection />
        <ServicesTicker />
        {/* I will continue to build out the rest of the sections here! */}
      </main>
    </div>
  );
};

export default Index;