import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Popup from "../Popup/Popup";
import { addLayer, setCursor, changeHover, resetHover, on } from "../MapBoxApi";
import Alert from "../Alert";
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

    on(map, "mouseleave", () => {
      resetHover(map, hoveredStateId);

      setHoverStateId(null);
      setCursor(map, "");
    });

    on(map, "click", e => {
      if (!e.features[0]) return;

      const alert = Alert(e.features[0]);
      const popup = Popup.show(map, e.lngLat, alert);
      props.onPopupShow(popup);
    });
  }

  return <div id="rainforest-foundation-map" />;
}

Map.propTypes = {
  map: PropTypes.object,
  onPopupShow: PropTypes.func
};

export default Map;
