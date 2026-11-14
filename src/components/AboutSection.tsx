import {motion, useReducedMotion} from 'motion/react';
import {ArrowRight} from 'lucide-react';
import {gymConfig} from '../config/gymConfig';
import {ResilientImage} from './ResilientImage';

interface AboutSectionProps {
  onExploreServices: () => void;
}

export function AboutSection({onExploreServices}: AboutSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="apropos" className="bg-white text-zinc-950 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left: Architectural Club Image */}
          <motion.div
            initial={prefersReducedMotion ? false : {opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-6 flex flex-col"
          >
            <div className="relative w-full h-full min-h-[340px] lg:min-h-[520px] rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
              <ResilientImage
                src={gymConfig.media.about}
                alt="Réception et plateau fonctionnel moderne BEST FORME à Casablanca"
                className="w-full h-full object-cover"
                fallbackTitle="BEST FORME · ESPACE CASABLANCA"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/85 via-black/45 to-transparent text-white">
                <p className="text-xs font-medium tracking-wider uppercase text-red-400">
                  Casablanca · Club Premium
                </p>
                <p className="font-display text-2xl font-bold tracking-tight mt-1">
                  Conçu pour la régularité et les résultats concrets
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Editorial Storytelling & 4 Core Pillars */}
          <motion.div
            initial={prefersReducedMotion ? false : {opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-red-600 mb-3">
                À propos de BEST FORME
              </p>
              <h2
                style={{textWrap: 'balance'}}
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 leading-[1.06] mb-5"
              >
                Une nouvelle référence du fitness et de la musculation à Casablanca
              </h2>
              <p className="text-base text-zinc-600 leading-relaxed mb-8">
                Implantée au cœur de Casablanca, BEST FORME réunit dans un même lieu
                exigence sportive, matériel de pointe et accompagnement humain. Que votre
                objectif soit de gagner en force, d’améliorer votre cardio ou de reprendre
                une activité physique structurée, chaque zone a été pensée pour vous faire
                progresser durablement.
              </p>

              {/* 4 Pillars with clean hairline dividers (no thick border-l-4) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-zinc-200 pt-8">
                {gymConfig.aboutPillars.map((pillar) => (
                  <div key={pillar.number} className="space-y-2">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-mono text-xs font-semibold text-red-600 tabular-nums">
                        {pillar.number}.
                      </span>
                      <h3 className="text-base font-bold text-zinc-950">{pillar.title}</h3>
                    </div>
                    <p className="text-sm text-zinc-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-9 pt-6 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm text-zinc-600">
                <span className="font-semibold text-zinc-950">Visite découverte offerte</span>{' '}
                sur rendez-vous
              </div>
              <button
                type="button"
                onClick={onExploreServices}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-zinc-950 hover:bg-red-600 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                <span>Voir nos disciplines</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
