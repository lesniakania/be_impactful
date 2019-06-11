import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Config from "../Config";
import "./Sidebar.css";

function Alert(props) {
  return (
    <li>
      <h3>{props.name}</h3>
      {props.description}
    </li>
  );
}

function alertPropsFromFeature(feature) {
  const properties = feature.properties;
  return { name: properties.Com, description: properties.Nar };
}

function Sidebar(props) {
  const fetchAlerts = () => {
    let { map } = props;
    map &&
      map.on("load", () => {
        const alerts = map
          .queryRenderedFeatures({
            layers: [Config.layerName]
          })
          .map(alertPropsFromFeature);
        setAlerts(alerts);
      });
  };

  useEffect(fetchAlerts, [props.map]);
  let [alerts, setAlerts] = useState([]);

  return (
    <div className="sidebar">
      <h2>Alerts</h2>
      <ul>
        {alerts.map(alert => (
          <Alert key={alert.name} {...alert} />
        ))}
      </ul>
    </div>
  );
}

Alert.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

Sidebar.propTypes = {
  map: PropTypes.object
};

export default Sidebar;
