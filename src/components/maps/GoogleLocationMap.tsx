import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";

import {
  businessLocation,
  googleMapsApiKey,
} from "../../config/location";
import DirectionsButton from "./DirectionsButton";

const darkMapStyles: google.maps.MapTypeStyle[] = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#111111",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d6d6d6",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#101010",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9f8d4f",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#2a2a2a",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#161616",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#c2b36a",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#050505",
      },
    ],
  },
];

interface GoogleLocationMapProps {
  compact?: boolean;
  className?: string;
}

const GoogleLocationMap = ({
  compact = false,
  className = "",
}: GoogleLocationMapProps) => {
  const {
    isLoaded,
    loadError,
  } =
    useJsApiLoader({
      id: "god-is-involved-google-map",
      googleMapsApiKey:
        googleMapsApiKey || "",
    });

  if (!googleMapsApiKey) {
    return (
      <div
        className={`
        flex
        min-h-[260px]
        flex-col
        justify-between
        rounded-[32px]
        border
        border-[#D4AF37]/30
        bg-zinc-950
        p-6
        ${className}
        `}
      >
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-[#D4AF37]">
            Map Setup Required
          </p>

          <h3 className="mt-4 text-2xl font-bold">
            {businessLocation.name}
          </h3>

          <p className="mt-2 text-white/60">
            Add VITE_GOOGLE_MAPS_API_KEY to render
            the live showroom map.
          </p>
        </div>

        <div className="mt-6">
          <DirectionsButton compact={compact} />
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div
        className={`
        flex
        min-h-[260px]
        items-center
        justify-center
        rounded-[32px]
        border
        border-red-500/30
        bg-zinc-950
        p-6
        text-center
        text-red-300
        ${className}
        `}
      >
        Unable to load Google Maps.
      </div>
    );
  }

  return (
    <div
      className={`
      relative
      overflow-hidden
      rounded-[32px]
      border
      border-white/10
      bg-zinc-950
      ${className}
      `}
    >
      {!isLoaded ? (
        <div
          className="
          flex
          min-h-[260px]
          items-center
          justify-center
          text-white/50
          "
        >
          Loading map...
        </div>
      ) : (
        <GoogleMap
          center={
            businessLocation.coordinates
          }
          zoom={15}
          mapContainerClassName={
            compact
              ? "h-[260px] w-full"
              : "h-[420px] md:h-[520px] w-full"
          }
          options={{
            styles:
              darkMapStyles,
            disableDefaultUI:
              compact,
            zoomControl:
              !compact,
            streetViewControl:
              false,
            mapTypeControl:
              false,
            fullscreenControl:
              !compact,
            clickableIcons:
              false,
          }}
        >
          <MarkerF
            position={
              businessLocation.coordinates
            }
            title={
              businessLocation.name
            }
          />
        </GoogleMap>
      )}

      <div
        className="
        absolute
        inset-x-4
        bottom-4
        rounded-[24px]
        border
        border-white/10
        bg-black/75
        p-4
        backdrop-blur-xl
        "
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#D4AF37]">
              Showroom
            </p>

            <h3 className="mt-1 text-xl font-bold">
              {businessLocation.name}
            </h3>

            <p className="text-sm text-white/60">
              {businessLocation.address}
              , {businessLocation.city}
            </p>
          </div>

          <DirectionsButton compact={compact} />
        </div>
      </div>
    </div>
  );
};

export default GoogleLocationMap;
