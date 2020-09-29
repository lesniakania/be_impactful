# Be Impactful

A map widget for Impact Working Group #omgkrk

## Development

Create `.env` file with `MAPBOX_ACCESS_TOKEN=token`

```
npm install
npm start
```

## Production

```
npm run build
```

You should have now `main.[hash].js` in the `./dist` directory.

You can use a widget in any html page like that:

```html
<script src="path-to-generated-main-js-bundle"></script>
```

Or you can deploy example to [Github Pages](https://lesniakania.github.io/be_impactful/):

```
npm run deploy
```

## How to feed widget with data

1. Generate geojson file using csv file. Data needed: id, latitude, longitude

```
npm run generate-geojson ~/path-to-the.csv
```

Generated geojson file should be in `./data` directory.

2. Upload geojson to the Mapbox Studio as dataset.
3. Create a tileset from this dataset.
4. Add a layer with this tileset/dataset in the custom style.
5. Update ./src/Config.js - `style`, `sourceLayer` (dataset name), `layerName` (layer name you added to the style)
6. Make sure that you use correct `accessToken` (placed in `.env` as `MAPBOX_ACCESS_TOKEN=token`)
