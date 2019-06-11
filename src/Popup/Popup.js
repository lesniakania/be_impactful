import React from "react";
import { renderToString } from "react-dom/server";
import PropTypes from "prop-types";
import "./Popup.css";

class Popup extends React.Component {
  fetcha(fecha) {
    if (fecha) {
      <h4>Fecha: {fecha}</h4>;
    }
  }

  render() {
    return (
      <div>
        <img src={this.props.imgSrc} width="240" />
        <h3>{this.props.tipo}</h3>
        {this.props.narrative}

        <br />
        {this.fetcha(this.props.fecha)}
      </div>
    );
  }

  static toString(props) {
    return renderToString(<Popup {...props} />);
  }
}

Popup.propTypes = {
  imgSrc: PropTypes.string,
  tipo: PropTypes.string,
  narrative: PropTypes.string,
  fecha: PropTypes.string
};

export default Popup;
