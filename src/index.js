import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Config from "./Config";
import App from "./App/App";

const root = document.createElement("div");
root.id = Config.widgetRootElementId;
document.body.appendChild(root);
ReactDOM.render(<App />, document.getElementById(Config.widgetRootElementId));
