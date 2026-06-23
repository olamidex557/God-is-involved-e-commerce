import {
  divIcon,
} from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from "react-leaflet";

import {
  businessLocation,
} from "../../config/location";
import DirectionsButton from "./DirectionsButton";

interface OpenStreetLocationMapProps {
  compact?: boolean;
  className?: string;
}

const markerIcon = divIcon({
  className: "business-map-marker",
  html: '<span class="business-map-marker__pulse"></span><span class="business-map-marker__pin"></span>',
  iconAnchor: [
    18,
    36,
  ],
  iconSize: [
    36,
    36,
  ],
  popupAnchor: [
    0,
    -34,
  ],
});

const OpenStreetLocationMap = ({
  compact = false,
  className = "",
}: OpenStreetLocationMapProps) => {
  const position: [
    number,
    number,
  ] = [
    businessLocation.coordinates.lat,
    businessLocation.coordinates.lng,
  ];

  return (
    <div
      className={`
      relative
      overflow-hidden
      rounded-[32px]
      border
      border-white/10
      bg-zinc-950
      shadow-[0_30px_80px_rgba(0,0,0,0.35)]
      ${className}
      `}
    >
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        zoomControl={false}
        className={
          compact
            ? "h-[260px] w-full"
            : "h-[420px] w-full md:h-[520px]"
        }
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {!compact && (
          <ZoomControl position="topright" />
        )}

        <Marker
          icon={markerIcon}
          position={position}
          title={businessLocation.name}
        >
          <Popup>
            <strong>
              {businessLocation.name}
            </strong>
            <br />
            {businessLocation.address}
            , {businessLocation.city}
          </Popup>
        </Marker>
      </MapContainer>

      <div
        className="
        pointer-events-none
        absolute
        inset-0
        bg-[linear-gradient(180deg,rgba(11,15,20,0.12),rgba(11,15,20,0)_35%,rgba(11,15,20,0.62))]
        "
      />

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

export default OpenStreetLocationMap;
