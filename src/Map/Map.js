import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Popup from "../Popup/Popup";
import { addLayer, setCursor, changeHover, resetHover, on } from "../MapBoxApi";
import Organization from "../Organization";
import "./Map.css";

function Map(props) {
  useEffect(configureMap, [props.map]);
  let hoveredId = null;

  function configureMap() {
    const { map } = props;

    if (map) {
      addLayer(map);
      bindEventListeners(map);
    }
  }

  function bindEventListeners(map) {
    on(map, "mousemove", (e) => {
      if (!e.features[0]) return;

      setCursor(map, "pointer");

      const newHoverId = e.features[0].id;
      changeHover(map, hoveredId, newHoverId);
      hoveredId = newHoverId;
    });

    on(map, "mouseleave", () => {
      resetHover(map, hoveredId);

      hoveredId = null;
      setCursor(map, "");
    });

    on(map, "click", (e) => {
      if (!e.features[0]) return;

      const organization = Organization(e.features[0]);
      const popup = Popup.show(map, e.lngLat, organization);
      props.onPopupShow(popup);
    });
  }

  return <div id="map-container" />;
}

Map.propTypes = {
  map: PropTypes.object,
  onPopupShow: PropTypes.func,
};

export default Map;
