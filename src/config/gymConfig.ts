import heroGymImg from '../assets/images/hero_gym_casablanca_1794670839882.jpg';
import heroCardioArenaImg from '../assets/images/hero_cardio_arena_1794671601491.jpg';
import heroFunctionalZoneImg from '../assets/images/hero_functional_zone_1794671601495.jpg';
import aboutSpaceImg from '../assets/images/about_club_space_1794670840498.jpg';
import serviceMusculationImg from '../assets/images/service_musculation_1794670840705.jpg';
import serviceCardioImg from '../assets/images/service_cardio_1794670840861.jpg';
import serviceFitnessImg from '../assets/images/service_fitness_1794670841166.jpg';
import serviceCoachingImg from '../assets/images/service_coaching_1794670842087.jpg';
import serviceProgrammesImg from '../assets/images/service_programmes_1794670842473.jpg';
import serviceRemiseEnFormeImg from '../assets/images/service_remise_en_forme_1794670842812.jpg';

export type ServiceIconName =
  | 'Dumbbell'
  | 'HeartPulse'
  | 'Flame'
  | 'UserCheck'
  | 'ClipboardList'
  | 'Target';

export interface GymService {
  id: string;
  number: string;
  title: string;
  icon: ServiceIconName;
  description: string;
  highlights: string[];
  image: string;
  imageAlt: string;
}

export interface SubscriptionPlan {
  id: 'basic' | 'premium' | 'vip';
  name: string;
  subtitle: string;
  monthlyPriceMAD: number;
  annualMonthlyPriceMAD: number;
  featured?: boolean;
  description: string;
  features: string[];
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Équipements' | 'Musculation' | 'Cardio' | 'Espace & Cours';
  caption: string;
  image: string;
  alt: string;
  span?: 'wide' | 'tall' | 'standard';
}

export interface TestimonialItem {
  id: string;
  fullName: string;
  memberRole: string;
  planName: string;
  outcomeMetric: string;
  quote: string;
}

export const gymConfig = {
  brandName: 'BEST FORME',
  city: 'Casablanca, Maroc',
  slogan: 'BEST FORME – Dépasse tes limites, construis ta meilleure version.',
  heroSubtitle:
    'Club de musculation, cardio training et coaching sportif à Casablanca. Un cadre architectural pensé pour la performance durable, équipé de matériel professionnel et encadré par des coachs certifiés.',

  contact: {
    // Coordonnées modifiables facilement avant mise en ligne
    address: '142 Boulevard d’Anfa, Quartier Gauthier, Casablanca 20060, Maroc',
    addressNote: 'Adresse de démonstration à personnaliser avec votre emplacement exact',
    phoneDisplay: '+212 5 22 00 00 00',
    phoneHref: 'tel:+212522000000',
    whatsappDisplay: '+212 6 00 00 00 00',
    whatsappNumber: '212600000000', // Format international sans "+" pour wa.me
    whatsappDefaultMessage:
      'Bonjour BEST FORME Casablanca, je souhaite obtenir des informations sur vos abonnements et réserver une visite.',
    email: 'contact@bestforme.ma',
    // Optionnel : URL d'un webhook (Formspree, Make, API interne) pour recevoir les formulaires par e-mail
    contactWebhookUrl: '',
    openingHours: [
      { days: 'Lundi – Vendredi', hours: '06:00 – 23:00' },
      { days: 'Samedi – Dimanche', hours: '08:00 – 21:00' },
      { days: 'Jours fériés', hours: '09:00 – 18:00' },
    ],
    mapLocation: {
      // Coordonnées GPS modifiables (actuellement centrées sur Casablanca / Gauthier-Anfa)
      lat: 33.5912,
      lng: -7.6324,
      zoom: 15,
      placeTitle: 'BEST FORME – Casablanca',
      directionsUrl: 'https://www.google.com/maps/search/?api=1&query=33.5912,-7.6324',
    },
  },

  media: {
    hero: heroGymImg,
    about: aboutSpaceImg,
    heroSlides: [
      {
        id: 'slide-musculation',
        image: heroGymImg,
        alt: 'Plateau principal de musculation et racks olympiques BEST FORME à Casablanca',
        label: 'Plateau Musculation & Force',
      },
      {
        id: 'slide-cardio',
        image: heroCardioArenaImg,
        alt: 'Studio cardio panoramique connecté avec vue urbaine à Casablanca',
        label: 'Studio Cardio Panoramique',
      },
      {
        id: 'slide-functional',
        image: heroFunctionalZoneImg,
        alt: 'Zone fonctionnelle HIIT avec piste de sprint et équipements professionnels',
        label: 'Zone Fonctionnelle & HIIT',
      },
    ],
  },

  heroMetrics: [
    { value: '1 800 m²', label: 'Surface sportive équipée' },
    { value: '06h – 23h', label: 'Ouverture 7 jours sur 7' },
    { value: '4 Zones', label: 'Force, Cardio, HIIT & Mobilité' },
    { value: 'Casablanca', label: 'Quartier Gauthier · Anfa' },
  ],

  aboutPillars: [
    {
      number: '01',
      title: 'Un espace sportif moderne',
      description:
        'Des plateaux aérés, une acoustique maîtrisée, des vestiaires soignés et une circulation fluide entre chaque zone d’entraînement.',
    },
    {
      number: '02',
      title: 'Des équipements de qualité',
      description:
        'Machines guidées biomécaniques, barres olympiques calibrées, haltères jusqu’à 50 kg et parc cardio connecté dernière génération.',
    },
    {
      number: '03',
      title: 'Un environnement motivant',
      description:
        'Une atmosphère exigeante et bienveillante où débutants, pratiquants réguliers et athlètes progressent ensemble chaque jour.',
    },
    {
      number: '04',
      title: 'Un accompagnement sur mesure',
      description:
        'Bilan initial complet, correction posturale et suivi adapté à vos objectifs : prise de masse, perte de poids, endurance ou vitalité.',
    },
  ],

  services: [
    {
      id: 'musculation',
      number: '01',
      title: 'Musculation',
      icon: 'Dumbbell',
      description:
        'Plateau complet de charges libres, racks à squat olympiques, poulies réglables et machines convergentes pour développer force et masse musculaire.',
      highlights: ['Charges libres & haltères', 'Racks olympiques', 'Machines guidées'],
      image: serviceMusculationImg,
      imageAlt: 'Espace musculation BEST FORME équipé de haltères noirs et disques olympiques',
    },
    {
      id: 'cardio-training',
      number: '02',
      title: 'Cardio Training',
      icon: 'HeartPulse',
      description:
        'Tapis de course connectés, vélos elliptiques, escaliers mécaniques et rameurs Concept2 pour améliorer votre endurance cardiovasculaire.',
      highlights: ['Tapis & escaliers connectés', 'Suivi fréquence cardiaque', 'Zone HIIT cardio'],
      image: serviceCardioImg,
      imageAlt: 'Studio cardio training moderne avec tapis de course et escaliers mécaniques',
    },
    {
      id: 'fitness',
      number: '03',
      title: 'Fitness',
      icon: 'Flame',
      description:
        'Séances collectives dynamiques, circuits métaboliques, training fonctionnel sur gazon synthétique et travail avec kettlebells.',
      highlights: ['Cours collectifs encadrés', 'Circuit training', 'Renforcement global'],
      image: serviceFitnessImg,
      imageAlt: 'Espace fitness fonctionnel avec piste verte, kettlebells et cordes ondulatoires',
    },
    {
      id: 'coaching-personnalise',
      number: '04',
      title: 'Coaching personnalisé',
      icon: 'UserCheck',
      description:
        'Accompagnement individuel avec un coach dédié : maîtrise technique des mouvements, gestion des charges et motivation constante.',
      highlights: ['Séances one-to-one', 'Correction posturale', 'Suivi hebdomadaire'],
      image: serviceCoachingImg,
      imageAlt: 'Coach sportif BEST FORME accompagnant un adhérent sur un soulevé de terre',
    },
    {
      id: 'programmes-entrainement',
      number: '05',
      title: 'Programmes d’entraînement',
      icon: 'ClipboardList',
      description:
        'Planification structurée par cycles de 4 à 8 semaines avec progression mesurable en force, hypertrophie ou recomposition corporelle.',
      highlights: ['Plan structuré par cycles', 'Suivi des performances', 'Ajustements mensuels'],
      image: serviceProgrammesImg,
      imageAlt: 'Athlète consultant son programme d’entraînement personnalisé en salle',
    },
    {
      id: 'remise-en-forme',
      number: '06',
      title: 'Remise en forme',
      icon: 'Target',
      description:
        'Reprise d’activité progressive, mobilité articulaire, gainage profond et récupération active pour retrouver énergie et confort au quotidien.',
      highlights: ['Reprise progressive', 'Mobilité & posture', 'Récupération active'],
      image: serviceRemiseEnFormeImg,
      imageAlt: 'Espace calme dédié à la mobilité, au stretching et à la remise en forme',
    },
  ] satisfies GymService[],

  // Exemples de tarifs en dirhams marocains (MAD) facilement modifiables
  pricingDisclaimer:
    'Exemples de tarifs en MAD donnés à titre indicatif et entièrement personnalisables selon la grille commerciale de BEST FORME.',
  plans: [
    {
      id: 'basic',
      name: 'Basic',
      subtitle: 'L’essentiel de la performance',
      monthlyPriceMAD: 350,
      annualMonthlyPriceMAD: 295,
      description: 'Accès complet aux plateaux de musculation et de cardio training 7j/7.',
      features: [
        'Accès illimité aux équipements musculation & cardio',
        'Ouverture continue de 06h00 à 23h00 en semaine',
        'Accès aux vestiaires et casiers sécurisés',
        'Séance d’orientation initiale sur les machines',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      subtitle: 'L’équilibre club & cours collectifs',
      monthlyPriceMAD: 550,
      annualMonthlyPriceMAD: 465,
      featured: true,
      description:
        'Accès aux équipements, au studio fitness fonctionnel et à l’ensemble des cours collectifs.',
      features: [
        'Tout le contenu de l’offre Basic inclus',
        'Accès illimité aux cours collectifs Fitness & HIIT',
        'Bilan de condition physique toutes les 8 semaines',
        'Accès prioritaire aux zones fonctionnelles & mobilité',
      ],
    },
    {
      id: 'vip',
      name: 'VIP',
      subtitle: 'Accompagnement intégral sur mesure',
      monthlyPriceMAD: 950,
      annualMonthlyPriceMAD: 810,
      description:
        'Accès complet au club accompagné d’un coaching personnalisé et d’un programme d’entraînement évolutif.',
      features: [
        'Tout le contenu de l’offre Premium inclus',
        '4 séances de coaching personnalisé par mois',
        'Programme d’entraînement et suivi mensuel dédiés',
        'Accès invité week-end (2 invitations / mois)',
      ],
    },
  ] satisfies SubscriptionPlan[],

  gallery: [
    {
      id: 'gal-1',
      title: 'Plateau principal & Racks',
      category: 'Musculation',
      caption: 'Racks olympiques et éclairage architectural linéaire',
      image: heroGymImg,
      alt: 'Vue d’ensemble du plateau musculation BEST FORME à Casablanca',
      span: 'wide',
    },
    {
      id: 'gal-2',
      title: 'Accueil & Hall fonctionnel',
      category: 'Espace & Cours',
      caption: 'Réception et zone de training collectif vitrée',
      image: aboutSpaceImg,
      alt: 'Hall d’accueil et espace d’entraînement fonctionnel BEST FORME',
      span: 'standard',
    },
    {
      id: 'gal-3',
      title: 'Parc Haltères & Disques',
      category: 'Équipements',
      caption: 'Disques calibrés et haltères haute précision',
      image: serviceMusculationImg,
      alt: 'Équipements de musculation haut de gamme et poids libres',
      span: 'standard',
    },
    {
      id: 'gal-4',
      title: 'Studio Cardio Connecté',
      category: 'Cardio',
      caption: 'Tapis de course, vélos et escaliers face aux baies vitrées',
      image: serviceCardioImg,
      alt: 'Espace cardio training avec tapis et escaliers connectés',
      span: 'standard',
    },
    {
      id: 'gal-5',
      title: 'Zone HIIT & Turf',
      category: 'Espace & Cours',
      caption: 'Piste de sprint, kettlebells, rameurs et cordes',
      image: serviceFitnessImg,
      alt: 'Activités sportives fonctionnelles et circuit training',
      span: 'wide',
    },
    {
      id: 'gal-6',
      title: 'Coaching Individuel',
      category: 'Musculation',
      caption: 'Encadrement technique sur mouvements polyarticulaires',
      image: serviceCoachingImg,
      alt: 'Séance de coaching personnalisé en musculation',
      span: 'standard',
    },
    {
      id: 'gal-7',
      title: 'Suivi de Programme',
      category: 'Équipements',
      caption: 'Planification des charges et cycles d’entraînement',
      image: serviceProgrammesImg,
      alt: 'Suivi de programme d’entraînement sur tablette en salle',
      span: 'standard',
    },
    {
      id: 'gal-8',
      title: 'Studio Mobilité & Récupération',
      category: 'Espace & Cours',
      caption: 'Espace lumineux dédié aux étirements et à la remise en forme',
      image: serviceRemiseEnFormeImg,
      alt: 'Zone calme pour la mobilité et la remise en forme',
      span: 'standard',
    },
  ] satisfies GalleryPhoto[],

  // Témoignages fictifs clairement signalés comme exemples de démonstration
  testimonialsDisclaimer:
    'Exemples de démonstration : ces avis clients sont fictifs et peuvent être remplacés par vos véritables retours d’adhérents.',
  testimonials: [
    {
      id: 'tem-1',
      fullName: 'Youssef El Amrani',
      memberRole: 'Adhérent depuis 11 mois · Cadre financier',
      planName: 'Offre VIP',
      outcomeMetric: '-9 kg de masse grasse en 5 mois',
      quote:
        'Je cherchais une salle calme tôt le matin à Casablanca avec un vrai suivi. Le programme structuré sur 8 semaines et les séances de coaching m’ont permis de retrouver ma condition physique sans jamais me blesser.',
    },
    {
      id: 'tem-2',
      fullName: 'Salma Bennani',
      memberRole: 'Adhérente depuis 7 mois · Architecte',
      planName: 'Offre Premium',
      outcomeMetric: '4 séances par semaine maintenues',
      quote:
        'L’ambiance des cours collectifs et la propreté des équipements font toute la différence. J’enchaîne le cardio training et les cours fonctionnels après le travail avec une vraie régularité.',
    },
    {
      id: 'tem-3',
      fullName: 'Karim Tazi',
      memberRole: 'Adhérent depuis 1 an · Entrepreneur',
      planName: 'Offre Basic',
      outcomeMetric: '+25 kg sur mes mouvements de base',
      quote:
        'Le plateau musculation est impeccablement entretenu et les racks sont disponibles même aux heures de pointe. On sent une vraie culture de la progression et du respect dans la salle.',
    },
  ] satisfies TestimonialItem[],
};
