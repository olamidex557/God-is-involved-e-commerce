export const businessLocation = {
  name: "God Is Involved",
  address: "419 Oke-Aro Road",
  city: "Oke-Aro, Ogun State",
  coordinates: {
    lat: 6.6821,
    lng: 3.2144,
  },
};

const locationQuery = `${businessLocation.name} ${businessLocation.address} ${businessLocation.city}`;
const coordinatePair = `${businessLocation.coordinates.lat},${businessLocation.coordinates.lng}`;

export const openStreetMapUrl =
  `https://www.openstreetmap.org/?mlat=${businessLocation.coordinates.lat}&mlon=${businessLocation.coordinates.lng}#map=16/${businessLocation.coordinates.lat}/${businessLocation.coordinates.lng}`;

export const openStreetMapDirectionsUrl =
  `https://www.openstreetmap.org/directions?to=${coordinatePair}#map=16/${businessLocation.coordinates.lat}/${businessLocation.coordinates.lng}`;

export const googleMapsExternalUrl =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    locationQuery
  )}`;
