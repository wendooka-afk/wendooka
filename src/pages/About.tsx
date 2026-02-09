import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlobalCta from '@/components/GlobalCta';
import { Link } from 'react-router-dom';
import { CheckCircle, Target, Lightbulb } from 'lucide-react';
import { teamData } from '@/data/team';
import { Button } from '@/components/ui/button';
import { AnimatedTeamSection } from '@/components/ui/team-section';

const AboutPage: React.FC = () => {
  React.useEffect(() => {
    document.title = "À propos de Wendooka | Agence web orientée performance";
    const metaDescription = document.querySelector('meta[name="description"]');
    const content = "Découvrez Wendooka, agence web fondée en 2017, son équipe, sa mission et sa vision orientée performance digitale et résultats business.";
    if (metaDescription) {
      metaDescription.setAttribute("content", content);
    }
  }, []);

  return (
    <div className="bg-dark-black text-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-24 md:py-40 text-center bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url('/271248.webp')` }}>
          <div className="absolute inset-0 bg-gradient-to-b from-dark-black/95 via-dark-black/80 to-dark-black z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-7xl font-bold font-poppins mb-6 tracking-tight leading-tight">
              Wendooka, une agence web orientée <span className="text-lime-accent">performance</span> et croissance digitale
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
              Depuis 2017, nous accompagnons entreprises, institutions et entrepreneurs dans la conception de solutions digitales sur-mesure, pensées pour générer un impact business concret.
            </p>
          </div>
        </section>

        {/* EEAT Introduction */}
        <section className="py-20 md:py-32 border-b border-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-lime-accent/5 rounded-3xl blur-2xl"></div>
                <img src="/60349.webp" alt="L'équipe Wendooka en réunion" className="relative rounded-3xl w-full h-auto object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="space-y-8">
                <div className="inline-block px-4 py-1.5 bg-lime-accent/10 border border-lime-accent/20 rounded-full text-lime-accent text-sm font-bold uppercase tracking-widest">
                  Notre Histoire
                </div>
                <h2 className="text-3xl md:text-5xl font-bold font-poppins text-white leading-tight">
                  Un partenaire stratégique pour vos défis numériques
                </h2>
                <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
                  <p>
                    Wendooka est une agence web fondée en 2017 par <span className="text-white font-semibold">Oumarou Sanda</span>, avec une ambition claire : concevoir des solutions digitales performantes, utiles et durables.
                  </p>
                  <p>
                    Nous n'intervenons pas comme de simples exécutants, mais comme un partenaire stratégique. Notre approche combine vision business, excellence du design UI/UX et une maîtrise technologique de pointe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 md:py-32 bg-dark-gray/30">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-10">Notre mission : transformer des idées en solutions digitales performantes</h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Notre mission est d’accompagner nos clients dans la réussite de leurs projets digitaux en concevant des solutions alignées sur leurs objectifs réels : visibilité, conversion, performance et évolutivité. Chaque projet est pensé comme un investissement stratégique, mesuré par son impact.
            </p>
          </div>
        </section>

        {/* Collaboration Principles */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-16 text-center">Nos principes de collaboration</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="p-10 bg-dark-gray/50 rounded-3xl border border-gray-800 hover:border-lime-accent/50 transition-colors group">
                <div className="h-16 w-16 bg-lime-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-lime-accent transition-colors">
                  <Target className="h-8 w-8 text-lime-accent group-hover:text-dark-black transition-colors" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Centré sur vos enjeux business</h3>
                <p className="text-gray-400 text-lg leading-relaxed text-balance">
                  Nous nous immergeons dans votre contexte pour concevoir des solutions adaptées à vos contraintes, vos objectifs et votre marché.
                </p>
              </div>
              <div className="p-10 bg-dark-gray/50 rounded-3xl border border-gray-800 hover:border-lime-accent/50 transition-colors group">
                <div className="h-16 w-16 bg-lime-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-lime-accent transition-colors">
                  <Lightbulb className="h-8 w-8 text-lime-accent group-hover:text-dark-black transition-colors" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Orienté résultats</h3>
                <p className="text-gray-400 text-lg leading-relaxed text-balance">
                  Chaque décision est guidée par la performance, la mesurabilité et la valeur créée pour votre activité.
                </p>
              </div>
              <div className="p-10 bg-dark-gray/50 rounded-3xl border border-gray-800 hover:border-lime-accent/50 transition-colors group">
                <div className="h-16 w-16 bg-lime-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-lime-accent transition-colors">
                  <CheckCircle className="h-8 w-8 text-lime-accent group-hover:text-dark-black transition-colors" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Exigence et qualité</h3>
                <p className="text-gray-400 text-lg leading-relaxed text-balance">
                  Nous privilégions la qualité, la clarté et la durabilité plutôt que la rapidité ou les effets de mode.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Differentiation */}
        <section className="py-24 md:py-32 bg-lime-accent text-dark-black">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-8">Ce qui différencie Wendooka</h2>
            <p className="text-xl md:text-2xl font-medium leading-relaxed">
              Nous ne livrons pas des sites ou des designs standardisés. Nous accompagnons des projets structurés, avec une vision long terme, une méthodologie claire et un haut niveau d’exigence sur la performance et l’expérience utilisateur.
            </p>
          </div>
        </section>

        {/* Team Section with Animation */}
        <AnimatedTeamSection
          title="Une équipe pluridisciplinaire au service de vos défis"
          description="Wendooka s’appuie sur une équipe aux compétences complémentaires, réunissant stratégie, design, développement et pilotage de projets pour transformer vos ambitions en réalité."
          members={teamData}
          className="bg-transparent"
        />

        {/* Target Audience / Projects */}
        <section className="py-20 md:py-32 bg-dark-gray/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="flex-1">
                <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-8">Les types de projets que nous accompagnons</h2>
                <div className="space-y-6">
                  {[
                    "Des entreprises en phase de structuration ou de croissance",
                    "Des institutions avec des enjeux de crédibilité et de performance",
                    "Des entrepreneurs porteurs de projets digitaux ambitieux"
                  ].map((target, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 bg-dark-black border border-gray-800 rounded-2xl">
                      <div className="h-6 w-6 rounded-full bg-lime-accent flex-shrink-0"></div>
                      <span className="text-lg font-medium text-gray-300">{target}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 text-center md:text-left p-10 bg-dark-black border-2 border-lime-accent rounded-[3rem]">
                <h3 className="text-3xl font-bold font-poppins mb-6 italic text-lime-accent leading-snug">
                  "Un projet digital réussi ne se code pas, il se pense stratégiquement."
                </h3>
                <p className="text-lg text-gray-400">
                  C'est cette conviction qui anime Wendooka depuis sa création.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Refined */}
        <section className="py-24 md:py-32 text-center container mx-auto px-4">
          <div className="bg-dark-gray/50 border border-gray-800 p-12 md:p-24 rounded-[4rem]">
            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-8 leading-tight">Construisons un projet digital solide et rentable</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Si vous recherchez un partenaire digital impliqué, structuré et orienté résultats, échangeons sur votre projet et voyons comment Wendooka peut vous accompagner.
            </p>
            <Button asChild className="bg-lime-accent text-dark-black hover:bg-white hover:text-dark-black font-bold rounded-full px-12 py-8 text-xl transition-all shadow-xl shadow-lime-accent/20">
              <Link to="/contact">Obtenir un devis gratuit</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;