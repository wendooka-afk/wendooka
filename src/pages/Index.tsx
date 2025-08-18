import { MadeWithDyad } from "@/components/made-with-dyad";
import HeroSection from "@/components/HeroSection"; // Import the new HeroSection

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HeroSection />
      {/* You can add more sections here as we build them */}
      <MadeWithDyad />
    </div>
  );
};

export default Index;