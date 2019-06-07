import React from "react";
import "./Legend.css";

function Legend() {
  return (
    <div className="legend">
      <img
        src="https://www.geoindigena.org/wp-content/uploads/2018/08/GEOindigena_72p_bk-05.png"
        width="100"
      />
      <br />
      <img
        src="http://dev.rainforestfoundation.org/wp-content/uploads/2015/11/RFF-Green-logo-transparent-background-1-e1447537422821.png"
        alt="RFUS"
      />
      <h4>
        THREATS TO INDIGENOUS LAND
        <br />
        IN PANAMA'S DARIEN
      </h4>
      <div>
        <span className="threats" />
        Threats
      </div>
      <div>
        <span className="indigenas-lands" />
        Indigenous Lands
      </div>
      <div>
        <span className="protected-areas" />
        Protected Areas
      </div>
    </div>
  );
}

export default Legend;
