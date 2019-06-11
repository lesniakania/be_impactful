export default function Alert(feature) {
  const properties = feature.properties;
  return {
    name: properties.Tipo,
    description: properties.Nar,
    coordinates: feature.geometry.coordinates[0][0]
  };
}
