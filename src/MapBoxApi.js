import mapboxgl from "mapbox-gl/dist/mapbox-gl";
import Config from "./Config";

export function createMap() {
  mapboxgl.accessToken = Config.accessToken;
  var map = new mapboxgl.Map({
    container: "rainforest-foundation-map",
    style: Config.style
  });

  return map;
}

export function setCursor(map, cursor) {
  map.getCanvas().style.cursor = cursor;
}

export function changeHover(map, hoveredStateId, newHoveredStateId) {
  resetHover(map, hoveredStateId);
  setHover(map, newHoveredStateId, true);
}

export function resetHover(map, hoveredStateId) {
  if (hoveredStateId) {
    setHover(map, hoveredStateId, false);
  }
}

function setHover(map, hoveredStateId, hover) {
  map.setFeatureState(
    {
      source: "composite",
      sourceLayer: Config.sourceLayer,
      id: hoveredStateId
    },
    { hover: hover }
  );
}

export function addLayer(map) {
  map.on("load", () => {
    // The feature-state dependent fill-opacity expression will render the hover effect
    // when a feature's hover state is set to true.
    map.addLayer({
      id: "hovered-outlines",
      type: "fill",
      source: "composite",
      "source-layer": Config.sourceLayer,
      layout: {},
      paint: {
        "fill-color": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          Config.hoveredAreaColor,
          Config.areaColor
        ]
      }
    });
  });
}

export function on(map, event, callback) {
  map.on("load", () => {
    map.on(event, Config.layerName, callback);
  });
}

export function showPopup(map, lngLat, popupHtml) {
  return new mapboxgl.Popup()
    .setLngLat(lngLat)
    .setHTML(popupHtml)
    .addTo(map);
}

export function queryRenderedFeatures(map, callback) {
  map.on("load", () => {
    const features = map.queryRenderedFeatures({
      layers: [Config.layerName]
    });
    callback(features);
  });
}

export function easeTo(map, alert) {
  map.easeTo({ center: alert.coordinates });
}
