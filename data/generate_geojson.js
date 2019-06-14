const csvtojson = require("csvtojson");
const fs = require("fs");

const args = process.argv;
let csvFilePath;

if (args.length < 3) {
  console.error("Please provide path to a features csv file");
  process.exit(1);
} else {
  csvFilePath = args[2];
}

async function main() {
  const json = await jsonFromCSVFile(csvFilePath);
  const alerts = uniqueAlerts(json);
  const features = alerts.map(featureFromJson);

  const geoJson = {
    type: "FeatureCollection",
    features: features
  };

  const geoJsonFilePath = "./data/dataset.geo.json";
  fs.writeFile(geoJsonFilePath, JSON.stringify(geoJson), error => {
    if (error) {
      console.error("There was an issue with saving geoJSON file - " + error);
    } else {
      console.log("GeoJSON was successfully created in " + geoJsonFilePath);
    }
  });
}
main();

function featureFromJson(feature) {
  return {
    geometry: {
      type: "Point",
      coordinates: [parseFloat(feature.X), parseFloat(feature.Y)]
    },
    type: "Feature",
    properties: {
      title: ensurePresence(feature.name),
      description: ensurePresence(feature.desc),
      category: ensurePresence(feature.category),
      community: ensurePresence(feature.village),
      photos: [feature.foto1, feature.foto2].filter(ensurePresence),
      action: ensurePresence(feature.action),
      field_date: ensurePresence(feature.field_date),
      alert_date: ensurePresence(feature.alert_date)
    }
  };
}

function ensurePresence(thing) {
  if (thing != "" && thing != "0") return thing;
  else return null;
}

function jsonFromCSVFile(csvFilePath) {
  return csvtojson().fromFile(csvFilePath);
}

function uniqueAlerts(alerts) {
  let unique = {};

  alerts.forEach(alert => {
    unique[alert.name] = alert;
  });

  return Object.keys(unique).map(k => unique[k]);
}
