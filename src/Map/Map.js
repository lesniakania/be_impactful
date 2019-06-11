import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import mapboxgl from "mapbox-gl/dist/mapbox-gl";
import Popup from "../Popup/Popup";
import { addLayer, setCursor, changeHover, resetHover, on } from "../MapBoxApi";
import "./Map.css";

function Map(props) {
  useEffect(configureMap, [props.map]);
  let [hoveredStateId, setHoverStateId] = useState(null);

  function configureMap() {
    const { map } = props;

    if (map) {
      addLayer(map);
      bindEventListeners(map);
    }
  }

  function bindEventListeners(map) {
    on(map, "mousemove", e => {
      if (!e.features[0]) return;

      setCursor(map, "pointer");

      const newHoveredStateId = e.features[0].id;
      changeHover(map, hoveredStateId, newHoveredStateId);
      setHoverStateId(newHoveredStateId);
    });

    // Change it back to a pointer when it leaves.
    on(map, "mouseleave", () => {
      resetHover(map, hoveredStateId);

      setHoverStateId(null);
      setCursor(map, "");
    });

    on(map, "click", e => {
      // Just in case there is no feature returned from the click, we don't want
      // the code below to cause an error, so we just return
      if (!e.features[0]) return;

      // This just makes the code easier to read to see what is being done
      // You can use || to have an alternative default if the value is not set
      var imgSrc = e.features[0].properties.foto;
      var tipo = e.features[0].properties.Tipo;
      var narrative = e.features[0].properties.Nar;
      var fecha = e.features[0].properties.Fecha;

      var popupHtml = Popup.toString({ imgSrc, tipo, narrative, fecha });

      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(popupHtml)
        .addTo(map);
    });
  }

  return <div id="rainforest-foundation-map" />;
}

Map.propTypes = {
  map: PropTypes.object
};

export default Map;
