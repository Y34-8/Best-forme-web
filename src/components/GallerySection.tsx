import {useState, useEffect} from 'react';
import {motion, useReducedMotion} from 'motion/react';
import {Expand, X, ChevronLeft, ChevronRight} from 'lucide-react';
import {gymConfig, type GalleryPhoto} from '../config/gymConfig';
import {ResilientImage} from './ResilientImage';

type CategoryFilter = 'Tout' | GalleryPhoto['category'];

const CATEGORIES: CategoryFilter[] = [
  'Tout',
  'Équipements',
  'Musculation',
  'Cardio',
  'Espace & Cours',
];

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('Tout');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const filteredPhotos =
    activeCategory === 'Tout'
      ? gymConfig.gallery
      : gymConfig.gallery.filter((item) => item.category === activeCategory);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredPhotos.length,
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + filteredPhotos.length) % filteredPhotos.length,
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredPhotos.length]);

  const activePhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  return (
    <section id="galerie" className="bg-zinc-950 text-white py-20 lg:py-28 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-red-500 mb-3">
              Galerie Photos
            </p>
            <h2
              style={{textWrap: 'balance'}}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.05]"
            >
              Immersion dans les espaces BEST FORME
            </h2>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="tablist"
            aria-label="Filtrer la galerie par espace"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-lg self-start lg:self-auto"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveCategory(category);
                    setLightboxIndex(null);
                  }}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-red-600 text-white'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/70'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredPhotos.map((photo, index) => {
            const isWide = photo.span === 'wide' && activeCategory === 'Tout';
            return (
              <motion.button
                key={photo.id}
                type="button"
                onClick={() => setLightboxIndex(index)}
                initial={prefersReducedMotion ? false : {opacity: 0, y: 14}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.1}}
                transition={{duration: 0.3, delay: Math.min(index * 0.04, 0.2)}}
                aria-label={`Agrandir la photo : ${photo.title}`}
                className={`group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 ${
                  isWide ? 'sm:col-span-2 aspect-[16/10]' : 'aspect-[4/3]'
                }`}
              >
                <ResilientImage
                  src={photo.image}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  fallbackTitle={photo.title}
                />

                {/* Hover Scrim & Caption */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-200"
                />

                <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-md bg-zinc-950/75 border border-white/15 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Expand className="w-4 h-4" aria-hidden="true" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="text-xs font-medium text-red-400 mb-0.5">{photo.category}</p>
                  <h3 className="font-display text-xl font-bold text-white tracking-tight">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-zinc-300 mt-0.5 line-clamp-1">{photo.caption}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800">
              <div className="flex items-center gap-3 text-sm">
                <span className="font-semibold text-white">{activePhoto.title}</span>
                <span className="text-zinc-500" aria-hidden="true">
                  ·
                </span>
                <span className="text-zinc-400">{activePhoto.category}</span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Fermer l’aperçu"
                className="w-10 h-10 inline-flex items-center justify-center rounded-md text-zinc-300 hover:text-white hover:bg-zinc-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative bg-black aspect-[16/10] max-h-[72vh] w-full flex items-center justify-center">
              <ResilientImage
                src={activePhoto.image}
                alt={activePhoto.alt}
                className="w-full h-full object-contain"
                fallbackTitle={activePhoto.title}
              />

              {filteredPhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length,
                      )
                    }
                    aria-label="Photo précédente"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-md bg-zinc-950/80 border border-white/15 text-white hover:bg-red-600 transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length)
                    }
                    aria-label="Photo suivante"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-md bg-zinc-950/80 border border-white/15 text-white hover:bg-red-600 transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            <div className="px-5 py-3.5 flex items-center justify-between text-xs sm:text-sm text-zinc-400 border-t border-zinc-800">
              <span>{activePhoto.caption}</span>
              <span className="font-mono tabular-nums text-zinc-500">
                {lightboxIndex + 1} / {filteredPhotos.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
