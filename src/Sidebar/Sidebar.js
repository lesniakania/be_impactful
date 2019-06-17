import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { queryRenderedFeatures, easeTo } from "../MapBoxApi";
import Alert from "../Alert";
import Popup from "../Popup/Popup";
import TimeSlider from "./TimeSlider";
import "./Sidebar.css";

function AlertItem(props) {
  const { alert } = props;

  const onClick = () => {
    props.onClick(alert);
  };

  return (
    <li className="alert__item" onClick={onClick}>
      <h3 className="alert__title">{alert.title}</h3>
      <p className="alert__desc">{alert.description}</p>
    </li>
  );
}

function Sidebar(props) {
  let { map } = props;

  const setCenterToMiddleAlertPoint = alerts => {
    let x = median(alerts.map(alert => alert.coordinates[0]));
    let y = median(alerts.map(alert => alert.coordinates[1]));
    easeTo(map, [x, y]);
  };

  function median(array) {
    const sortedArray = array.sort();
    return sortedArray[Math.floor(sortedArray.length / 2)];
  }

  const fetchAlerts = () => {
    if (map) {
      queryRenderedFeatures(map, features => {
        const alerts = features.map(Alert);
        setAlerts(alerts);
        setCenterToMiddleAlertPoint(alerts);
      });
    }
  };

  const onAlertClicked = alert => {
    easeTo(map, alert.coordinates);
    const lngLat = { lng: alert.coordinates[0], lat: alert.coordinates[1] };
    const popup = Popup.show(map, lngLat, alert);
    props.onPopupShow(popup);
  };

  useEffect(fetchAlerts, [props.map]);
  let [alerts, setAlerts] = useState([]);

  return (
    <div className="sidebar">
      <h2 className="title">Alerts</h2>
      <ul>
        {alerts.map(alert => (
          <AlertItem key={alert.key} onClick={onAlertClicked} alert={alert} />
        ))}
      </ul>
      <TimeSlider />
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
