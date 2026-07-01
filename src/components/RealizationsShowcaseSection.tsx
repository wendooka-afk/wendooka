import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '@/data/servicesData';
import { Project } from '@/types/project';
import { cn } from '@/lib/utils';

interface ShowcaseConfig {
  slug: string;
}

const SHOWCASE: ShowcaseConfig[] = [
  { slug: 'mballen-ong' },
  { slug: 'barkantedjo' },
  { slug: 'oumarousanda' },
  { slug: 'baladjikwata' },
  { slug: 'commune-ngaoundere-2' },
];

const FAN = [
  { rotate: -18, translateY: 36, scale: 0.78 },
  { rotate: -9, translateY: 14, scale: 0.9 },
  { rotate: 0, translateY: 0, scale: 1 },
  { rotate: 9, translateY: 14, scale: 0.9 },
  { rotate: 18, translateY: 36, scale: 0.78 },
];

const RealizationsShowcaseSection: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  const items = SHOWCASE
    .map((s) => ({ ...s, project: projectsData.find((p) => p.slug === s.slug) }))
    .filter((s): s is ShowcaseConfig & { project: Project } => Boolean(s.project));

  if (items.length === 0) return null;

  const centerIdx = Math.floor(items.length / 2);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-dark-black text-white">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-lime-accent/10 blur-[120px]" />
      <div className="pointer-events-none absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <p className="font-semibold text-lime-accent mb-2">Nos réalisations</p>
          <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">Des sites qui marquent leur secteur</h2>
          <p className="text-lg text-gray-400">
            De l'humour à la musique, de l'institution publique à l'expertise digitale : un aperçu des plateformes que nous avons conçues pour des profils variés.
          </p>
        </div>

        <div className="flex items-center justify-center" style={{ perspective: '2000px' }}>
          {items.map((item, idx) => {
            const base = FAN[idx] ?? FAN[centerIdx];
            const isHovered = hovered === idx;
            const isOuter = idx === 0 || idx === items.length - 1;
            const isCenter = idx === centerIdx;

            const rotate = isHovered ? 0 : base.rotate;
            const translateY = isHovered ? base.translateY - 16 : base.translateY;
            const scale = isHovered ? base.scale * 1.1 : base.scale;
            const brightness = isHovered ? 1 : isOuter ? 0.55 : isCenter ? 1 : 0.8;
            const zIndex = isHovered ? 50 : isCenter ? 30 : isOuter ? 10 : 20;

            return (
              <div
                key={item.slug}
                className={cn(
                  'relative flex w-[140px] sm:w-[190px] md:w-[250px] xl:w-[320px]',
                  idx !== 0 && '-ml-8 sm:-ml-12 md:-ml-16 xl:-ml-20'
                )}
                style={{ zIndex }}
              >
                {isCenter && (
                  <>
                    <div className="absolute -inset-x-16 -top-16 -bottom-16 -z-10 rounded-full bg-lime-accent/20 blur-3xl" />
                    <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 w-12 h-[130%] bg-gradient-to-b from-transparent via-lime-accent/40 to-transparent blur-2xl rotate-6 -z-10" />
                    <div className="absolute right-0 top-1/2 translate-x-full -translate-y-1/2 w-12 h-[130%] bg-gradient-to-b from-transparent via-lime-accent/40 to-transparent blur-2xl -rotate-6 -z-10" />
                  </>
                )}

                <Link
                  to={`/realisations/${item.project.slug}`}
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                  className="block w-full rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl transition-all duration-500 ease-out"
                  style={{
                    transform: `translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
                    filter: `brightness(${brightness})`,
                  }}
                >
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-[#161616] border-b border-white/10">
                    <span className="w-2 h-2 rounded-full bg-red-500/70" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
                    <span className="w-2 h-2 rounded-full bg-green-500/70" />
                  </div>
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={item.project.image}
                      alt={item.project.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/realisations"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white border border-white/20 rounded-full px-8 py-4 hover:border-lime-accent hover:text-lime-accent transition-colors"
          >
            Voir toutes nos réalisations
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RealizationsShowcaseSection;
