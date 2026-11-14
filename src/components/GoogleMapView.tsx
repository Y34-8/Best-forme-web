import {useEffect, useState, useCallback} from 'react';
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  APILoadingStatus,
} from '@vis.gl/react-google-maps';
import {MapPin, ExternalLink} from 'lucide-react';
import {gymConfig} from '../config/gymConfig';

const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

function GymMarkerWithInfo() {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);
  const {lat, lng, placeTitle, directionsUrl} = gymConfig.contact.mapLocation;

  const handleClose = useCallback(() => setInfoOpen(false), []);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{lat, lng}}
        title={placeTitle}
        onClick={() => setInfoOpen((prev) => !prev)}
      >
        <Pin background="#DC2626" borderColor="#991B1B" glyphColor="#FFFFFF" scale={1.15} />
      </AdvancedMarker>

      {infoOpen && marker && (
        <InfoWindow anchor={marker} maxWidth={260} onCloseClick={handleClose}>
          <div className="p-1 text-zinc-900">
            <p className="font-bold text-sm text-zinc-950">{placeTitle}</p>
            <p className="text-xs text-zinc-600 mt-1">{gymConfig.contact.address}</p>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 mt-2"
            >
              <span>Voir l’itinéraire</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

function MapStatusObserver({onError}: {onError: () => void}) {
  const status = useApiLoadingStatus();

  useEffect(() => {
    if (status === APILoadingStatus.FAILED || status === APILoadingStatus.AUTH_FAILURE) {
      if (status === APILoadingStatus.AUTH_FAILURE) {
        window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
      }
      onError();
    }
  }, [status, onError]);

  return null;
}

export function GoogleMapView() {
  const [mapLoadError, setMapLoadError] = useState(false);
  const {lat, lng, zoom, directionsUrl} = gymConfig.contact.mapLocation;

  const handleMapError = useCallback(() => {
    setMapLoadError(true);
  }, []);

  if (!MAPS_API_KEY || mapLoadError) {
    return (
      <div className="relative h-[320px] sm:h-[360px] w-full rounded-xl border border-zinc-800 bg-zinc-900 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-lg bg-red-600/15 border border-red-600/30 flex items-center justify-center text-red-500 mb-4">
          <MapPin className="w-6 h-6" aria-hidden="true" />
        </div>
        <h3 className="font-display text-2xl font-bold text-white mb-2">
          BEST FORME · Casablanca
        </h3>
        <p className="text-sm text-zinc-300 max-w-sm mb-2">{gymConfig.contact.address}</p>
        <p className="text-xs text-zinc-400 max-w-md mb-5">
          Coordonnées configurables dans <code className="text-zinc-200">src/config/gymConfig.ts</code>{' '}
          (lat : {lat}, lng : {lng}).
        </p>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-red-600 hover:bg-red-500 rounded-md transition-colors"
        >
          <span>Ouvrir dans Google Maps</span>
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    );
  }

  return (
    <div className="relative h-[320px] sm:h-[360px] w-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
      <APIProvider apiKey={MAPS_API_KEY} libraries={['marker']} language="fr" region="MA">
        <MapStatusObserver onError={handleMapError} />
        <GoogleMap
          mapId="DEMO_MAP_ID"
          defaultCenter={{lat, lng}}
          defaultZoom={zoom}
          gestureHandling="cooperative"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          style={{width: '100%', height: '100%'}}
        >
          <GymMarkerWithInfo />
        </GoogleMap>
      </APIProvider>

      <div className="absolute bottom-3 left-3 z-10">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-zinc-950/90 hover:bg-red-600 border border-white/15 rounded-md backdrop-blur-sm transition-colors"
        >
          <span>Itinéraire Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
