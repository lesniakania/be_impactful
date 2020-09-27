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
  const features = json.map(featureFromJson);

  const geoJson = {
    type: "FeatureCollection",
    features: features,
  };

  const geoJsonFilePath = "./data/dataset.geo.json";
  fs.writeFile(geoJsonFilePath, JSON.stringify(geoJson), (error) => {
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
      coordinates: [
        parseFloat(feature.latitude),
        parseFloat(feature.longitude),
      ],
    },
    type: "Feature",
    properties: {
      sdg_ids: arrayProperty(ensurePresence(feature.sdg_ids)),
      name: ensurePresence(feature.name),
      type_ids: arrayProperty(ensurePresence(feature.type_ids)),
      impact_description: ensurePresence(feature.impact_description),
      description: feature.description,
      website: ensurePresence(feature.website),
      contact_email: feature.contact_email,
    },
  };
}

function ensurePresence(thing) {
  if (thing != "" && thing != "0") return thing;
  else return null;
}

function arrayProperty(string) {
  return string.split(",");
}

function jsonFromCSVFile(csvFilePath) {
  return csvtojson().fromFile(csvFilePath);
}
