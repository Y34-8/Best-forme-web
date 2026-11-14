import {useState, useEffect, useCallback} from 'react';
import {Header} from './components/Header';
import {HeroSection} from './components/HeroSection';
import {AboutSection} from './components/AboutSection';
import {ServicesSection} from './components/ServicesSection';
import {PricingSection} from './components/PricingSection';
import {GallerySection} from './components/GallerySection';
import {TestimonialsSection} from './components/TestimonialsSection';
import {ContactSection} from './components/ContactSection';
import {Footer} from './components/Footer';
import {WhatsAppFloatingButton} from './components/WhatsAppFloatingButton';
import type {SubscriptionPlan} from './config/gymConfig';

export default function App() {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [preselectedInterest, setPreselectedInterest] = useState<string>(
    'Offre Premium (Mensuel)',
  );
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  // Tier 2 Google Maps Platform quota defense banner state
  useEffect(() => {
    const handleQuotaExceeded = () => {
      setMapsQuotaExceeded(true);
    };
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({behavior: 'smooth'});
    }
  }, []);

  const handleChoosePlan = useCallback(
    (plan: SubscriptionPlan, billingCycle: 'mensuel' | 'annuel') => {
      setSelectedPlanId(plan.id);
      const cycleLabel = billingCycle === 'mensuel' ? 'Mensuel' : 'Annuel';
      setPreselectedInterest(`Offre ${plan.name} (${cycleLabel})`);
      scrollToSection('contact');
    },
    [scrollToSection],
  );

  const handleSelectService = useCallback(
    (serviceTitle: string) => {
      setPreselectedInterest(serviceTitle);
      scrollToSection('contact');
    },
    [scrollToSection],
  );

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-50">
      {mapsQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      <Header onNavigateCta={() => scrollToSection('abonnements')} />

      <main className="flex-1">
        <HeroSection
          onDiscoverPlans={() => scrollToSection('abonnements')}
          onContactClick={() => scrollToSection('contact')}
        />

        <AboutSection onExploreServices={() => scrollToSection('services')} />

        <ServicesSection onSelectService={handleSelectService} />

        <PricingSection
          selectedPlanId={selectedPlanId}
          onChoosePlan={handleChoosePlan}
        />

        <GallerySection />

        <TestimonialsSection />

        <ContactSection preselectedInterest={preselectedInterest} />
      </main>

      <Footer />

      <WhatsAppFloatingButton />
    </div>
  );
}
