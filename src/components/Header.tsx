import {useState, useEffect} from 'react';
import {Menu, X, ArrowUpRight} from 'lucide-react';
import {gymConfig} from '../config/gymConfig';

const NAV_LINKS = [
  {label: 'Accueil', href: '#accueil'},
  {label: 'À propos', href: '#apropos'},
  {label: 'Services', href: '#services'},
  {label: 'Abonnements', href: '#abonnements'},
  {label: 'Galerie', href: '#galerie'},
  {label: 'Contact', href: '#contact'},
];

interface HeaderProps {
  onNavigateCta: () => void;
}

export function Header({onNavigateCta}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        scrolled
          ? 'bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/90'
          : 'bg-zinc-950/80 backdrop-blur-sm border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand wordmark */}
        <a
          href="#accueil"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#accueil');
          }}
          className="font-display text-2xl sm:text-[1.75rem] font-extrabold tracking-wider text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500"
        >
          {gymConfig.brandName}
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav
          aria-label="Navigation principale"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-zinc-300"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="relative py-1 hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-red-600 after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + mobile menu toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onNavigateCta();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-500 active:scale-[0.98] rounded-md transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          >
            <span>S’inscrire</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-zinc-200 hover:text-white hover:bg-zinc-900 border border-zinc-800 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-red-500"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive mobile drawer */}
      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-3 pb-6 space-y-1"
        >
          <nav aria-label="Menu mobile" className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="py-3 px-3 text-base font-medium text-zinc-200 hover:text-white hover:bg-zinc-900 rounded-md transition-colors border-b border-zinc-900 last:border-b-0"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onNavigateCta();
              }}
              className="w-full py-3 px-4 text-sm font-semibold text-white bg-red-600 hover:bg-red-500 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Découvrir nos abonnements</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
