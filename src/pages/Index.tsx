import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MarqueeSection from "@/components/MarqueeSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import TransformationSection from "@/components/TransformationSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import GlobalCta from "@/components/GlobalCta";
import AboutIntroSection from "@/components/AboutIntroSection";
import HomeServicesBenefits from "@/components/HomeServicesBenefits";

const Index = () => {
  return (
    <div className="bg-dark-black">
      <Header />
      <main>
        <HeroSection />
        <MarqueeSection />
        <AboutIntroSection />
        <HomeServicesBenefits />
        <ServicesSection />
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