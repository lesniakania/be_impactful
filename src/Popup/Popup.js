import React from "react";
import { renderToString } from "react-dom/server";
import PropTypes from "prop-types";
import { showPopup } from "../MapBoxApi";
import "./Popup.css";

const MAP = {
  "in-need": "Potrzebujący pomocy",
  helpers: "Niosący pomoc",
  "potential-sponsors": "Potencjalni sponsorzy",
};

class Popup extends React.Component {
  render() {
    return (
      <div>
        <h3 className="popup__title">{this.props.title}</h3>
        <p className="popup__info">{this.category()}</p>
        <p className="popup__info">
          <a href={`${this.props.url}`}>{`${this.props.url}`}</a>
        </p>
        <p className="popup__info">{this.props.email}</p>
        <p className="popup__info">{this.props.phone}</p>
        <p className="popup__info">{this.props.address}</p>
        <p className="popup__desc">{this.props.description}</p>
      </div>
    );
  }

  category() {
    return MAP[this.props.category];
  }

  static show(map, lngLat, organization) {
    var popupHtml = renderToString(<Popup {...organization} />);
    return showPopup(map, lngLat, popupHtml);
  }
}

Popup.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  category: PropTypes.string,
  address: PropTypes.string,
  url: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
};

export default Popup;
