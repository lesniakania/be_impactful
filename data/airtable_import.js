require("dotenv").config();

const converter = require("json-2-csv");
const fs = require("fs");

main();

async function main() {
  const base = require("airtable").base("appqui1fQeV7Gg3oy");
  const tableName = "Organizations";

  let organizations = [];

  eachOrganization(
    base,
    tableName,
    records => {
      records.forEach(function(record) {
        const organization = buildOrganization(record);
        organizations.push(organization);
      });
    },
    () => {
      generateCSV(organizations);
    }
  );
}

function eachOrganization(base, tableName, eachBlock, doneBlock) {
  base(tableName)
    .select({})
    .eachPage(
      function page(records, fetchNextPage) {
        eachBlock(records);

        fetchNextPage();
      },
      function done(err) {
        doneBlock();

        if (err) {
          console.error(err);
          return;
        }
      }
    );
}

function buildOrganization(record) {
  return {
    id: record.id,
    latitude: record.get("Latitude"),
    longitude: record.get("Longitude")
  };
}

function generateCSV(organizations) {
  const csvFilePath = "./data/organizations.csv";

  converter.json2csv(organizations, (err, csvString) => {
    if (err) {
      console.error(err);
    }

    fs.writeFileSync(csvFilePath, csvString);
  });
}
