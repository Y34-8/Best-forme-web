import {motion, useReducedMotion} from 'motion/react';
import {
  Dumbbell,
  HeartPulse,
  Flame,
  UserCheck,
  ClipboardList,
  Target,
  ArrowUpRight,
} from 'lucide-react';
import {gymConfig, type GymService, type ServiceIconName} from '../config/gymConfig';
import {ResilientImage} from './ResilientImage';

const ICON_MAP: Record<ServiceIconName, typeof Dumbbell> = {
  Dumbbell,
  HeartPulse,
  Flame,
  UserCheck,
  ClipboardList,
  Target,
};

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export function ServicesSection({onSelectService}: ServicesSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="services" className="bg-zinc-950 text-white py-20 lg:py-28 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-red-500 mb-3">
              Nos Disciplines &amp; Services
            </p>
            <h2
              style={{textWrap: 'balance'}}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.05]"
            >
              Six pôles spécialisés pour chaque objectif sportif
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed">
            Cliquez sur une discipline pour demander une séance d’essai ou un accompagnement
            adapté directement via notre équipe à Casablanca.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gymConfig.services.map((service: GymService, idx: number) => {
            const Icon = ICON_MAP[service.icon];
            return (
              <motion.article
                key={service.id}
                initial={prefersReducedMotion ? false : {opacity: 0, y: 18}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.15}}
                transition={{
                  duration: 0.35,
                  delay: Math.min(idx * 0.05, 0.2),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex flex-col bg-zinc-900/70 border border-zinc-800 hover:border-red-600/60 rounded-xl overflow-hidden transition-colors duration-200"
              >
                {/* Image Header */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                  <ResilientImage
                    src={service.image}
                    alt={service.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    fallbackTitle={service.title}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/25 to-transparent"
                  />
                  <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-red-400 tabular-nums">
                      {service.number}.
                    </span>
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-zinc-950/85 border border-white/15 text-red-500">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="font-display text-2xl font-bold tracking-tight text-white mb-2.5">
                    {service.title}
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed mb-5 flex-1">
                    {service.description}
                  </p>

                  {/* Unboxed typographic highlights (Zero-Pill Discipline) */}
                  <div className="text-xs text-zinc-400 pb-5 mb-5 border-b border-zinc-800">
                    {service.highlights.join(' · ')}
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectService(service.title)}
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 text-sm font-semibold text-white bg-zinc-800/80 hover:bg-red-600 rounded-md transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-red-500"
                  >
                    <span className="whitespace-nowrap">Demander des infos</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
