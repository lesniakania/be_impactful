import mapboxgl from "mapbox-gl/dist/mapbox-gl";
import Config from "./Config";

export function createMap() {
  mapboxgl.accessToken = Config.accessToken;
  var map = new mapboxgl.Map({
    container: "map",
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
      type: "line",
      source: "composite",
      "source-layer": Config.sourceLayer,
      layout: {},
      paint: {
        "line-color": "hsl(56, 90%, 83%)",
        "line-width": 2,
        "line-opacity": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          1,
          0
        ]
      }
    });
  });
}

export function on(map, event, callback) {
  map.on("load", () => {
    map.on(event, Config.layer, callback);
  });
}
