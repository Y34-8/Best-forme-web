import {MessageCircle} from 'lucide-react';
import {gymConfig} from '../config/gymConfig';

export function WhatsAppFloatingButton() {
  const href = `https://wa.me/${gymConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    gymConfig.contact.whatsappDefaultMessage,
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter avec BEST FORME sur WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 h-12 px-4 sm:px-5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-black/35 border border-emerald-400/30 transition-transform duration-150 hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
    >
      <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline text-sm font-semibold whitespace-nowrap">WhatsApp</span>
    </a>
  );
}
