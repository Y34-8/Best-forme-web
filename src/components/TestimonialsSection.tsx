import {motion, useReducedMotion} from 'motion/react';
import {Quote, Info} from 'lucide-react';
import {gymConfig} from '../config/gymConfig';

export function TestimonialsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="temoignages" className="bg-white text-zinc-950 py-20 lg:py-28 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-red-600 mb-3">
              Témoignages &amp; Retours
            </p>
            <h2
              style={{textWrap: 'balance'}}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 leading-[1.05]"
            >
              Des résultats mesurables au sein de la communauté
            </h2>
          </div>

          <div className="inline-flex items-start gap-2.5 max-w-md text-xs text-zinc-600 bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3">
            <Info className="w-4 h-4 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
            <span>{gymConfig.testimonialsDisclaimer}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {gymConfig.testimonials.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={prefersReducedMotion ? false : {opacity: 0, y: 16}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.2}}
              transition={{duration: 0.35, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1]}}
              className="flex flex-col justify-between p-7 rounded-xl bg-zinc-50 border border-zinc-200"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <Quote className="w-6 h-6 text-red-600" aria-hidden="true" />
                  <span className="font-mono text-xs font-semibold text-zinc-700 tabular-nums">
                    {item.outcomeMetric}
                  </span>
                </div>

                <blockquote className="text-sm sm:text-base text-zinc-700 leading-relaxed mb-6">
                  « {item.quote} »
                </blockquote>
              </div>

              <div className="pt-5 border-t border-zinc-200">
                <div className="text-sm font-bold text-zinc-950">{item.fullName}</div>
                <div className="text-xs text-zinc-500 mt-1 flex flex-wrap items-center gap-1.5">
                  <span>{item.memberRole}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-red-600 font-medium">{item.planName}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
