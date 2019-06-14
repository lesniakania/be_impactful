import React from "react";
import { renderToString } from "react-dom/server";
import PropTypes from "prop-types";
import { showPopup } from "../MapBoxApi";
import "./Popup.css";

class Popup extends React.Component {
  dates() {
    let datesArray = [];
    if (this.props.fieldDate) {
      datesArray.push(`Field date: ${this.props.fieldDate}`);
    }
    if (this.props.alertDate) {
      datesArray.push(`Alert date: ${this.props.alertDate}`);
    }

    return <h6>{datesArray.join(", ")}</h6>;
  }

  action() {
    if (this.props.action) {
      return <div>{this.props.action}</div>;
    }
  }

  photos() {
    const ul = this.props.photos.map((photoUrl, index) => {
      return (
        <li key={`photo-${index}`}>
          <img src={photoUrl} alt="photo" />
        </li>
      );
    });
    return <ul>{ul}</ul>;
  }

  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <h5>
          {this.props.category}, {this.props.community}
        </h5>
        {this.dates()}
        {this.props.description}

        {this.action()}
        {this.photos()}
      </div>
    );
  }

  static show(map, lngLat, alert) {
    var popupHtml = renderToString(<Popup {...alert} />);
    return showPopup(map, lngLat, popupHtml);
  }
}

Popup.propTypes = {
  title: PropTypes.string,
  category: PropTypes.string,
  community: PropTypes.string,
  description: PropTypes.string,
  action: PropTypes.string,
  photos: PropTypes.array,
  alertDate: PropTypes.string,
  fieldDate: PropTypes.string
};

export default Popup;
