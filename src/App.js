import React, { useEffect } from "react";
import "./App.css";
import mapboxgl from "mapbox-gl/dist/mapbox-gl";

function App() {
  const loadMap = () => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiY2FtZXJvbmVsbGlzIiwiYSI6InRHMGJHY0kifQ.Wv9TwqLWDLcJtiJMHD0PLA";
    var map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/cameronellis/cjnotuhgd1lav2smy0hiam9aq"
    });
  };

  useEffect(loadMap, []);

  return <div id="map" />;
}

export default App;
