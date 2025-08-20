import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MarqueeSection from "@/components/MarqueeSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import TransformationSection from "@/components/TransformationSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import GlobalCta from "@/components/GlobalCta";

const Index = () => {
  return (
    <div className="bg-dark-black">
      <Header />
      <main>
        <HeroSection />
        <MarqueeSection />
        <ServicesSection />
        <AboutSection />
        <PortfolioSection />
        <TransformationSection />
        <BlogSection />
        <GlobalCta />
      </main>
      <Footer />
    </div>
  );
};

export default Index;