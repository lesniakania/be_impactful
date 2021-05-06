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
    features: features
  };

  const geoJsonFilePath = "./data/organizations.geo.json";
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
    id: ensurePresence(feature.id),
    name: feature.name
  };
}

function ensurePresence(thing) {
  if (thing != "" && thing != "0") return thing;
  else return null;
}

function jsonFromCSVFile(csvFilePath) {
  return csvtojson().fromFile(csvFilePath);
}
