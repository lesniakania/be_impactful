export default function Alert(feature) {
  const properties = feature.properties;
  return {
    key: "alert-" + properties.title.replace(" ", "_"),
    coordinates: coordinates(feature),
    title: properties.title,
    category: properties.category,
    community: properties.community,
    description: properties.description,
    action: properties.action,
    photos: photos(properties),
    alertDate: properties.alert_date,
    fieldDate: properties.field_date
  };
}

function photos(properties) {
  if (properties.photos) {
    return JSON.parse(properties.photos);
  } else {
    return [];
  }
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
