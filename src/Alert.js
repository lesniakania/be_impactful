export default function Alert(feature) {
  const properties = feature.properties;
  return {
    key: "alert-" + properties.title.replace(" ", "_"),
    coordinates: feature.geometry.coordinates[0][0],
    title: properties.title,
    category: properties.category,
    community: properties.community,
    description: properties.description,
    action: properties.action,
    photos: JSON.parse(properties.photos),
    alertDate: properties.alert_date,
    fieldDate: properties.field_date
  };
}
