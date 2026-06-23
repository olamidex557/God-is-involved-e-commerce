export const businessLocation = {
  name: "God Is Involved",
  address: "419 Oke-Aro Road",
  city: "Oke-Aro, Ogun State",
  coordinates: {
    lat: 6.6821,
    lng: 3.2144,
  },
};

export const googleMapsApiKey =
  import.meta.env
    .VITE_GOOGLE_MAPS_API_KEY as string | undefined;

export const googleMapsSearchUrl =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${businessLocation.name} ${businessLocation.address}`
  )}`;

export const googleMapsDirectionsUrl =
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${businessLocation.name} ${businessLocation.address}`
  )}`;
