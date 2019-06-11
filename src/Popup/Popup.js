import React from "react";
import { renderToString } from "react-dom/server";
import PropTypes from "prop-types";
import { showPopup } from "../MapBoxApi";
import "./Popup.css";

class Popup extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.name}</h3>
        {this.props.description}
      </div>
    );
  }

  static show(map, lngLat, alert) {
    var popupHtml = renderToString(<Popup {...alert} />);
    return showPopup(map, lngLat, popupHtml);
  }
}

Popup.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string
};

export default Popup;
