import {gymConfig} from '../config/gymConfig';

const FOOTER_LINKS = [
  {label: 'Accueil', href: '#accueil'},
  {label: 'À propos', href: '#apropos'},
  {label: 'Services', href: '#services'},
  {label: 'Abonnements', href: '#abonnements'},
  {label: 'Galerie', href: '#galerie'},
  {label: 'Contact', href: '#contact'},
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <footer className="bg-black text-zinc-400 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-900">
          <div className="md:col-span-5 space-y-3">
            <div className="font-display text-2xl font-extrabold tracking-wider text-white">
              {gymConfig.brandName}
            </div>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              {gymConfig.slogan}
            </p>
            <p className="text-xs text-zinc-500 pt-1">{gymConfig.contact.address}</p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleScroll(link.href);
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Contact &amp; Horaires
            </h3>
            <div className="space-y-2 text-sm">
              <p>
                <a
                  href={gymConfig.contact.phoneHref}
                  className="font-mono hover:text-white transition-colors tabular-nums"
                >
                  {gymConfig.contact.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${gymConfig.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {gymConfig.contact.email}
                </a>
              </p>
              <div className="pt-2 space-y-1 text-xs text-zinc-500">
                {gymConfig.contact.openingHours.map((slot) => (
                  <p key={slot.days}>
                    {slot.days} : <span className="font-mono tabular-nums">{slot.hours}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            © {currentYear} {gymConfig.brandName} Casablanca. Tous droits réservés.
          </p>
          <p>
            Ce site intègre Google Maps Platform et respecte les conditions d’utilisation
            associées.
          </p>
        </div>
      </div>
    </footer>
  );
}
