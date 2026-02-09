import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MarqueeSection from "@/components/MarqueeSection";
import PortfolioSection from "@/components/PortfolioSection";
import TransformationSection from "@/components/TransformationSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import GlobalCta from "@/components/GlobalCta";
import AboutIntroSection from "@/components/AboutIntroSection";
import HomeServicesBenefits from "@/components/HomeServicesBenefits";

import TestimonialsSection from "@/components/TestimonialsSection";
import { useEffect } from "react";
import { AnimatedTeamSection } from "@/components/ui/team-section";
import { teamData } from "@/data/team";

const Index = () => {
  useEffect(() => {
    document.title = "Agence web sur-mesure orientée performance | Wendooka";
    const metaDescription = document.querySelector('meta[name="description"]');
    const content = "Agence web spécialisée en création de sites, développement sur-mesure, design et marketing digital. Plus de 150 projets réalisés.";
    if (metaDescription) {
      metaDescription.setAttribute("content", content);
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = content;
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="bg-dark-black text-white">
      <Header />
      <main>
        <HeroSection />
        <MarqueeSection />
        <AboutIntroSection />
        <HomeServicesBenefits />
        <PortfolioSection />
        <AnimatedTeamSection
          title="L'expertise humaine derrière vos succès"
          description="Notre équipe d'experts passionnés vous accompagne à chaque étape pour garantir la réussite technique et stratégique de vos projets."
          members={teamData}
          className="bg-dark-gray/20"
        />
        <TransformationSection />
        <BlogSection />
        <TestimonialsSection />
        <GlobalCta />
      </main>
      <Footer />
    </div>
  );
};

export default Index;