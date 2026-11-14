import {useState} from 'react';
import {motion, useReducedMotion} from 'motion/react';
import {Check, ArrowRight, Info} from 'lucide-react';
import {gymConfig, type SubscriptionPlan} from '../config/gymConfig';

interface PricingSectionProps {
  selectedPlanId: string | null;
  onChoosePlan: (plan: SubscriptionPlan, billingCycle: 'mensuel' | 'annuel') => void;
}

export function PricingSection({selectedPlanId, onChoosePlan}: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<'mensuel' | 'annuel'>('mensuel');
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="abonnements" className="bg-zinc-50 text-zinc-950 py-20 lg:py-28 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Interactive Billing Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-red-600 mb-3">
              Nos Abonnements
            </p>
            <h2
              style={{textWrap: 'balance'}}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 leading-[1.05]"
            >
              Trois formules claires pour votre rythme d’entraînement
            </h2>
          </div>

          {/* Interactive Filter / Segmented Billing Control */}
          <div
            role="group"
            aria-label="Fréquence de facturation"
            className="inline-flex items-center p-1 bg-zinc-200/80 rounded-lg self-start lg:self-auto"
          >
            <button
              type="button"
              onClick={() => setBillingCycle('mensuel')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                billingCycle === 'mensuel'
                  ? 'bg-white text-zinc-950 shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Tarif mensuel
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annuel')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                billingCycle === 'annuel'
                  ? 'bg-white text-zinc-950 shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Engagement annuel (-15%)
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {gymConfig.plans.map((plan, idx) => {
            const price =
              billingCycle === 'mensuel' ? plan.monthlyPriceMAD : plan.annualMonthlyPriceMAD;
            const isFeatured = Boolean(plan.featured);
            const isSelected = selectedPlanId === plan.id;

            return (
              <motion.article
                key={plan.id}
                initial={prefersReducedMotion ? false : {opacity: 0, y: 18}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.15}}
                transition={{
                  duration: 0.35,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`flex flex-col justify-between rounded-xl p-8 transition-all duration-200 ${
                  isFeatured
                    ? 'bg-zinc-950 text-white border border-zinc-800 shadow-lg'
                    : 'bg-white text-zinc-950 border border-zinc-200 hover:border-zinc-300'
                } ${isSelected ? 'ring-2 ring-red-600 ring-offset-2' : ''}`}
              >
                <div>
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className="font-display text-3xl font-extrabold tracking-tight">
                      {plan.name}
                    </h3>
                    {isFeatured && (
                      <span className="text-xs font-semibold uppercase tracking-wider text-red-500">
                        Recommandé
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs font-medium mb-6 ${
                      isFeatured ? 'text-zinc-400' : 'text-zinc-500'
                    }`}
                  >
                    {plan.subtitle}
                  </p>

                  {/* Tabular MAD Price */}
                  <div className="flex items-baseline gap-2 pb-6 mb-6 border-b border-current/10">
                    <span className="font-display text-5xl font-extrabold tabular-nums tracking-tight">
                      {price}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-mono text-sm font-semibold text-red-600">MAD</span>
                      <span
                        className={`text-xs ${
                          isFeatured ? 'text-zinc-400' : 'text-zinc-500'
                        }`}
                      >
                        / mois · exemple indicatif
                      </span>
                    </div>
                  </div>

                  <p
                    className={`text-sm leading-relaxed mb-6 ${
                      isFeatured ? 'text-zinc-300' : 'text-zinc-600'
                    }`}
                  >
                    {plan.description}
                  </p>

                  <ul className="space-y-3.5 mb-8">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-sm">
                        <Check
                          className="w-4 h-4 text-red-600 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span className={isFeatured ? 'text-zinc-200' : 'text-zinc-700'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onChoosePlan(plan, billingCycle)}
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-md transition-all duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${
                    isFeatured
                      ? 'bg-red-600 hover:bg-red-500 text-white'
                      : 'bg-zinc-950 hover:bg-red-600 text-white'
                  }`}
                >
                  <span>Choisir cette offre</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </motion.article>
            );
          })}
        </div>

        {/* Clear Customizable Price Notice */}
        <div className="mt-10 flex items-start sm:items-center gap-3 p-4 rounded-lg bg-white border border-zinc-200 text-xs sm:text-sm text-zinc-600">
          <Info className="w-4 h-4 text-red-600 shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
          <p>
            <strong className="font-semibold text-zinc-900">Tarifs personnalisables :</strong>{' '}
            {gymConfig.pricingDisclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
