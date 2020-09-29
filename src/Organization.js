export default function Organization(feature) {
  const properties = feature.properties;
  return {
    key: "organization-" + properties.id,
    coordinates: coordinates(feature),
    title: properties.title,
    description: properties.description,
    category: properties.category,
    address: properties.address,
    url: properties.url,
    email: properties.email,
    phone: properties.phone,
  };
}

function coordinates(feature) {
  const geometry = feature.geometry;
  const coordinates = geometry.coordinates;

  if (geometry.type === "Point") {
    return coordinates;
  } else if (geometry.type === "Polygon") {
    return coordinates[0][0];
  } else if (geometry.type === "LineString") {
    return coordinates[0];
  } else {
    throw "Unsupported geometry";
  }
}
