import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MarqueeSection from "@/components/MarqueeSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import TransformationSection from "@/components/TransformationSection";
import BlogSection from "@/components/BlogSection";
import CtaSection from "@/components/CtaSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

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
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;