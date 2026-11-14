import {useState, useEffect, type FormEvent} from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import {gymConfig} from '../config/gymConfig';
import {GoogleMapView} from './GoogleMapView';

interface ContactSectionProps {
  preselectedInterest: string;
}

interface FormValues {
  fullName: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  message?: string;
}

const INTEREST_OPTIONS = [
  'Offre Basic (Mensuel)',
  'Offre Basic (Annuel)',
  'Offre Premium (Mensuel)',
  'Offre Premium (Annuel)',
  'Offre VIP (Mensuel)',
  'Offre VIP (Annuel)',
  'Musculation',
  'Cardio Training',
  'Fitness',
  'Coaching personnalisé',
  'Programmes d’entraînement',
  'Remise en forme',
  'Visite découverte / Renseignements généraux',
];

export function ContactSection({preselectedInterest}: ContactSectionProps) {
  const [values, setValues] = useState<FormValues>({
    fullName: '',
    phone: '',
    email: '',
    interest: preselectedInterest || 'Offre Premium (Mensuel)',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'webhook_error'>('idle');
  const [submittedSnapshot, setSubmittedSnapshot] = useState<FormValues | null>(null);

  useEffect(() => {
    if (preselectedInterest) {
      setValues((prev) => ({
        ...prev,
        interest: preselectedInterest,
      }));
      setSubmitState('idle');
    }
  }, [preselectedInterest]);

  const validate = (data: FormValues): FormErrors => {
    const nextErrors: FormErrors = {};
    if (data.fullName.trim().length < 2) {
      nextErrors.fullName = 'Veuillez saisir votre nom complet (minimum 2 caractères).';
    }
    const cleanPhone = data.phone.replace(/[\s\-().]/g, '');
    if (!/^\+?[0-9]{8,15}$/.test(cleanPhone)) {
      nextErrors.phone =
        'Veuillez saisir un numéro de téléphone valide (ex. +212 6 00 00 00 00).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      nextErrors.email = 'Veuillez saisir une adresse e-mail valide.';
    }
    if (data.message.trim().length < 10) {
      nextErrors.message = 'Votre message doit contenir au moins 10 caractères.';
    }
    return nextErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitState('idle');

    try {
      const webhookUrl = gymConfig.contact.contactWebhookUrl.trim();
      if (webhookUrl) {
        const res = await fetch(webhookUrl, {
          method: 'POST',
          headers: {'Content-Type': 'application/json', Accept: 'application/json'},
          body: JSON.stringify({
            club: gymConfig.brandName,
            ...values,
            submittedAt: new Date().toISOString(),
          }),
        });
        if (!res.ok) {
          throw new Error('Webhook request failed');
        }
      }

      setSubmittedSnapshot({...values});
      setSubmitState('success');
      setValues((prev) => ({
        ...prev,
        fullName: '',
        phone: '',
        email: '',
        message: '',
      }));
    } catch {
      setSubmittedSnapshot({...values});
      setSubmitState('webhook_error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const buildWhatsAppHref = (customMessage?: string) => {
    const text = encodeURIComponent(customMessage || gymConfig.contact.whatsappDefaultMessage);
    return `https://wa.me/${gymConfig.contact.whatsappNumber}?text=${text}`;
  };

  return (
    <section id="contact" className="bg-zinc-950 text-white py-20 lg:py-28 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-red-500 mb-3">
            Contact &amp; Localisation
          </p>
          <h2
            style={{textWrap: 'balance'}}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.05] mb-4"
          >
            Rejoignez BEST FORME à Casablanca
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Prenez rendez-vous pour visiter la salle, démarrer votre abonnement ou échanger avec
            un coach sur vos objectifs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Contact Details, WhatsApp & Interactive Google Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-7 space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-white">Adresse du club</h3>
                  <p className="text-sm text-zinc-300 mt-1">{gymConfig.contact.address}</p>
                  <p className="text-xs text-zinc-500 mt-1">{gymConfig.contact.addressNote}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-5 border-t border-zinc-800">
                <Phone className="w-5 h-5 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-white">Téléphone</h3>
                  <a
                    href={gymConfig.contact.phoneHref}
                    className="inline-block text-sm font-mono text-zinc-200 hover:text-red-400 transition-colors mt-1 tabular-nums"
                  >
                    {gymConfig.contact.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-5 border-t border-zinc-800">
                <Mail className="w-5 h-5 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-white">E-mail</h3>
                  <a
                    href={`mailto:${gymConfig.contact.email}`}
                    className="inline-block text-sm text-zinc-200 hover:text-red-400 transition-colors mt-1"
                  >
                    {gymConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-5 border-t border-zinc-800">
                <Clock className="w-5 h-5 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="w-full">
                  <h3 className="text-sm font-semibold text-white mb-2">Horaires d’ouverture</h3>
                  <dl className="space-y-1.5 text-sm">
                    {gymConfig.contact.openingHours.map((slot) => (
                      <div key={slot.days} className="flex items-center justify-between gap-4">
                        <dt className="text-zinc-400">{slot.days}</dt>
                        <dd className="font-mono text-zinc-200 tabular-nums">{slot.hours}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div className="pt-5 border-t border-zinc-800">
                <a
                  href={buildWhatsAppHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-md transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Contacter sur WhatsApp ({gymConfig.contact.whatsappDisplay})</span>
                </a>
              </div>
            </div>

            {/* Interactive Google Map */}
            <GoogleMapView />
          </div>

          {/* Right Column: Validated Contact & Pre-inscription Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 lg:p-10">
              <div className="mb-7">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Envoyer une demande ou réserver une visite
                </h3>
                <p className="text-sm text-zinc-400 mt-1.5">
                  Réponse rapide par téléphone, e-mail ou WhatsApp.
                </p>
              </div>

              {submitState === 'success' && submittedSnapshot && (
                <div
                  role="status"
                  className="mb-7 p-5 rounded-lg bg-emerald-950/50 border border-emerald-700/60 text-emerald-100"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-white">
                        Votre demande a bien été enregistrée pour « {submittedSnapshot.interest} ».
                      </p>
                      <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                        Merci {submittedSnapshot.fullName}. Notre accueil de Casablanca vous
                        recontactera au {submittedSnapshot.phone}. Vous pouvez également
                        transmettre votre message instantanément via WhatsApp :
                      </p>
                      <div className="pt-1">
                        <a
                          href={buildWhatsAppHref(
                            `Bonjour BEST FORME, je suis ${submittedSnapshot.fullName} (${submittedSnapshot.phone}). Je suis intéressé(e) par : ${submittedSnapshot.interest}. Message : ${submittedSnapshot.message}`,
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-md transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Transmettre sur WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {submitState === 'webhook_error' && submittedSnapshot && (
                <div
                  role="alert"
                  className="mb-7 p-4 rounded-lg bg-amber-950/50 border border-amber-700/60 text-amber-100 flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="text-xs sm:text-sm space-y-2">
                    <p className="font-semibold">
                      Le serveur d’envoi e-mail externe n’a pas répondu.
                    </p>
                    <p>
                      Envoyez votre demande directement à l’équipe via WhatsApp en un clic :
                    </p>
                    <a
                      href={buildWhatsAppHref(
                        `Bonjour BEST FORME, je suis ${submittedSnapshot.fullName}. Offre/Service : ${submittedSnapshot.interest}. ${submittedSnapshot.message}`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-md"
                    >
                      <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Envoyer via WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-fullname"
                      className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
                    >
                      Nom complet *
                    </label>
                    <input
                      id="contact-fullname"
                      type="text"
                      value={values.fullName}
                      onChange={(e) => {
                        setValues({...values, fullName: e.target.value});
                        if (errors.fullName) setErrors({...errors, fullName: undefined});
                      }}
                      placeholder="Ex. Amine Benjelloun"
                      aria-invalid={Boolean(errors.fullName)}
                      className={`w-full px-4 py-3 text-sm rounded-md bg-zinc-950 border text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors ${
                        errors.fullName ? 'border-red-500' : 'border-zinc-800 focus:border-red-600'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
                    >
                      Téléphone *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={values.phone}
                      onChange={(e) => {
                        setValues({...values, phone: e.target.value});
                        if (errors.phone) setErrors({...errors, phone: undefined});
                      }}
                      placeholder="+212 6 00 00 00 00"
                      aria-invalid={Boolean(errors.phone)}
                      className={`w-full px-4 py-3 text-sm rounded-md bg-zinc-950 border text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-zinc-800 focus:border-red-600'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
                    >
                      Adresse e-mail *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={values.email}
                      onChange={(e) => {
                        setValues({...values, email: e.target.value});
                        if (errors.email) setErrors({...errors, email: undefined});
                      }}
                      placeholder="vous@exemple.ma"
                      aria-invalid={Boolean(errors.email)}
                      className={`w-full px-4 py-3 text-sm rounded-md bg-zinc-950 border text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors ${
                        errors.email ? 'border-red-500' : 'border-zinc-800 focus:border-red-600'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-interest"
                      className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
                    >
                      Offre ou service souhaité
                    </label>
                    <select
                      id="contact-interest"
                      value={values.interest}
                      onChange={(e) => setValues({...values, interest: e.target.value})}
                      className="w-full px-4 py-3 text-sm rounded-md bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-colors"
                    >
                      {INTEREST_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
                  >
                    Message &amp; objectifs *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={values.message}
                    onChange={(e) => {
                      setValues({...values, message: e.target.value});
                      if (errors.message) setErrors({...errors, message: undefined});
                    }}
                    placeholder="Précisez vos disponibilités, votre objectif sportif ou toute question sur nos abonnements..."
                    aria-invalid={Boolean(errors.message)}
                    className={`w-full px-4 py-3 text-sm rounded-md bg-zinc-950 border text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors resize-y ${
                      errors.message ? 'border-red-500' : 'border-zinc-800 focus:border-red-600'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-zinc-500">
                    * Champs obligatoires · Vos données restent strictement confidentielles.
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-500 disabled:opacity-60 active:scale-[0.98] rounded-md transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>{isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
