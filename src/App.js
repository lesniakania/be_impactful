import React, { useEffect } from "react";
import "./App.css";
import mapboxgl from "mapbox-gl/dist/mapbox-gl";

function App() {
  const loadMap = () => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYW5uYS1zbGltYWsiLCJhIjoiY2p2bWN4Ym5hMTdzcDQ5bWwxdTFocnlrdSJ9._dCxzb46y5Yvs9xDsfbQyg";
    var map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11"
    });
  };

  useEffect(loadMap, []);

  return <div id="map" />;
}

export default App;
