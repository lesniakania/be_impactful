import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { queryRenderedFeatures, easeTo } from "../MapBoxApi";
import Alert from "../Alert";
import Popup from "../Popup/Popup";
import "./Sidebar.css";

function AlertItem(props) {
  const { alert } = props;

  const onClick = () => {
    props.onClick(alert);
  };

  return (
    <li onClick={onClick}>
      <h3>{alert.name}</h3>
      {alert.description}
    </li>
  );
}

function Sidebar(props) {
  let { map } = props;

  const fetchAlerts = () => {
    if (map) {
      queryRenderedFeatures(map, features => {
        const alerts = features.map(Alert);
        setAlerts(alerts);
      });
    }
  };

  const onAlertClicked = alert => {
    easeTo(map, alert);
    const lngLat = { lng: alert.coordinates[0], lat: alert.coordinates[1] };
    const popup = Popup.show(map, lngLat, alert);
    props.onPopupShow(popup);
  };

  useEffect(fetchAlerts, [props.map]);
  let [alerts, setAlerts] = useState([]);

  return (
    <div className="sidebar">
      <h2>Alerts</h2>
      <ul>
        {alerts.map(alert => (
          <AlertItem key={alert.name} onClick={onAlertClicked} alert={alert} />
        ))}
      </ul>
    </div>
  );
}

AlertItem.propTypes = {
  alert: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

Sidebar.propTypes = {
  map: PropTypes.object,
  onPopupShow: PropTypes.func
};

export default Sidebar;
