import {
  MapPin,
  Navigation,
} from "lucide-react";

import {
  googleMapsExternalUrl,
  openStreetMapDirectionsUrl,
} from "../../config/location";

interface DirectionsButtonProps {
  compact?: boolean;
}

const DirectionsButton = ({
  compact = false,
}: DirectionsButtonProps) => {
  return (
    <div
      className={`
      flex
      ${compact
        ? "flex-col gap-2"
        : "flex-col sm:flex-row gap-3"
      }
      `}
    >
      <a
        href={openStreetMapDirectionsUrl}
        target="_blank"
        rel="noreferrer"
        className="
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-full
        bg-[#D4AF37]
        px-5
        py-3
        text-sm
        font-semibold
        text-black
        transition
        hover:shadow-[0_0_30px_rgba(212,175,55,0.35)]
        "
      >
        <Navigation size={16} />
        Get Directions
      </a>

      <a
        href={googleMapsExternalUrl}
        target="_blank"
        rel="noreferrer"
        className="
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-full
        border
        border-white/15
        px-5
        py-3
        text-sm
        font-semibold
        text-white
        transition
        hover:border-[#D4AF37]/60
        hover:text-[#D4AF37]
        "
      >
        <MapPin size={16} />
        Open in Google Maps
      </a>
    </div>
  );
};

export default DirectionsButton;
