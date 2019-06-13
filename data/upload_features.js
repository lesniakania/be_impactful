const csvtojson = require("csvtojson");
const fetch = require("node-fetch");

const args = process.argv;
let csvFilePath;

if (args.length < 3) {
  console.error("Please provide path to a features csv file");
  process.exit(1);
} else {
  csvFilePath = args[2];
}

csvtojson()
  .fromFile(csvFilePath)
  .then(json => {
    // console.log(json);
  });

const baseUrl = "https://api.mapbox.com";
const accessToken =
  "sk.eyJ1IjoiYW5uYS1zbGltYWsiLCJhIjoiY2p3dWQ2OTEwMG8wbDQzbXVlb3Mwb2tncyJ9.xZJ_yU6WWIf80hLyUqQsVA";
const accountUsername = "anna-slimak";

const datasetOptions = { name: "guana" };
let datasetId;

get("/datasets")
  .then(response => {
    console.log(response);
    return response.json();
  })
  .then(json => console.log(json));

// createDataset(datasetOptions).then(json => (datasetId = json.id));

// helper methods:

function createDataset(datasetOptions) {
  return post("/datasets", datasetOptions)
    .then(response => {
      if (response.status === 200) {
        console.log(
          "Dataset '" + datasetOptions.name + "' created successfully"
        );
        return response.json();
      } else {
        console.error(
          "Dataset could not be created, response returned status " +
            response.status
        );
      }
    })
    .catch(error => {
      console.error(
        "Dataset could not be created because of the error: ",
        error
      );
    });
}

function get(path, options = {}) {
  return http(path, { method: "GET", ...options });
}

function post(path, body = {}, options = {}) {
  return http(path, { method: "POST", body: JSON.stringify(body), ...options });
}

function http(path, options = {}) {
  const optionsWithAuth = {
    ...options,
    headers: {
      "Content-Type": "application/json"
    }
  };
  console.log(
    baseUrl + path + "/v1/" + accountUsername + "?access_token=" + accessToken
  );
  return fetch(
    baseUrl + path + "/v1/" + accountUsername + "?access_token=" + accessToken,
    optionsWithAuth
  );
}
