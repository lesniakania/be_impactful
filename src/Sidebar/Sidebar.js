import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { queryRenderedFeatures, easeTo } from "../MapBoxApi";
import Organization from "../Organization";
import Popup from "../Popup/Popup";
import "./Sidebar.css";
var organizationsData = require("../../data/organizations.geo.json");

function OrganizationItem(props) {
  const { organization } = props;

  const onClick = () => {
    props.onClick(organization);
  };

  return (
    <li className="organization__item" onClick={onClick}>
      <h3 className="organization__title">{organization.name}</h3>
      <p>
        <a href={`${organization.url}`}>{`${organization.url}`}</a>
      </p>
      <p>{organization.email}</p>
      <p>{organization.phone}</p>
      <p>{organization.address}</p>
      <p>{organization.description}</p>
    </li>
  );
}

function Sidebar(props) {
  let { map } = props;

  const setCenterToMiddleOrganizationPoint = organizations => {
    let x = median(
      organizations.map(organization => organization.coordinates[0])
    );
    let y = median(
      organizations.map(organization => organization.coordinates[1])
    );
    easeTo(map, [x, y]);
  };

  function median(array) {
    const sortedArray = array.sort();
    return sortedArray[Math.floor(sortedArray.length / 2)];
  }

  const fetchOrganizations = () => {
    if (map) {
      console.log(organizationsData);
      setOrganizations(organizationsData.features);
    }
  };

  const onOrganizationClicked = organization => {
    easeTo(map, organization.coordinates);
    const lngLat = {
      lng: organization.coordinates[0],
      lat: organization.coordinates[1]
    };
    const popup = Popup.show(map, lngLat, organization);
    props.onPopupShow(popup);
  };

  useEffect(fetchOrganizations, [props.map]);
  let [organizations, setOrganizations] = useState([]);

  return (
    <div className="sidebar">
      <h2 className="title">Organizations</h2>
      <ul>
        {organizations.map(organization => (
          <OrganizationItem
            key={organization.id}
            onClick={onOrganizationClicked}
            organization={organization}
          />
        ))}
      </ul>
    </div>
  );
}

OrganizationItem.propTypes = {
  organization: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

Sidebar.propTypes = {
  map: PropTypes.object,
  onPopupShow: PropTypes.func
};

export default Sidebar;
