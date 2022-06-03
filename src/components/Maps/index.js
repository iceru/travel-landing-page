import React, { useEffect, useState } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from "react-google-maps";
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
import PropTypes from "prop-types";
import { compose, withProps, withStateHandlers } from "recompose";

import Accomodation from "../../assets/images/accomodation.svg";
import Activity from "../../assets/images/activity.svg";
import Restaurants from "../../assets/images/restaurants.svg";
import Produce from "../../assets/images/shopping.svg";

import "./style.scss";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const propTypes = {
  positions: PropTypes.any,
  zoom: PropTypes.number,
};

const MarkerWithInfo = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const onToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const icon = () => {
    let serviceType = Accomodation;
    switch (item.IndustryCategoryGroups[0]) {
      case 0:
        serviceType = Accomodation;
        break;
      case 1:
        serviceType = Activity;
        break;
      case 2:
        serviceType = Restaurants;
        break;
      case 3:
        serviceType = Produce;
        break;
      default:
        return Accomodation;
    }

    return serviceType;
  };
  let iconMarker = new window.google.maps.MarkerImage(
    icon(),
    null /* size is determined at runtime */,
    null /* origin is 0,0 */,
    null /* anchor is bottom center of the scaled image */,
    new window.google.maps.Size(48, 48)
  );

  return (
    item.Geocodes && (
      <Marker
        position={{
          lat: item.Geocodes[0].Geocode.Latitude,
          lng: item.Geocodes[0].Geocode.Longitude,
        }}
        key={item.id}
        onClick={onToggleOpen}
        icon={iconMarker}
      >
        {isOpen && (
          <InfoBox
            onCloseClick={onToggleOpen}
            options={{ closeBoxURL: ``, enableEventPropagation: true }}
          >
            <div
              style={{
                backgroundColor: `white`,
                opacity: 1,
                padding: `12px`,
                borderRadius: "8px",
              }}
            >
              <div
                className="infoBox"
                style={{ fontSize: `14px`, fontColor: `#08233B` }}
              >
                <div className="text-end">
                  <FontAwesomeIcon
                    icon={faTimes}
                    onClick={onToggleOpen}
                    style={{ cursor: "pointer", marginBottom: "8px" }}
                  />
                </div>
                <div className="image">
                  <img
                    className="mb-2"
                    src={item.Images && item.Images[0].Url}
                  ></img>
                  <div className="name mb-2">{item.Name}</div>
                  <div className="address mb-2">
                    {item.PhysicalAddress.Line1}, {item.PhysicalAddress.City},{" "}
                    {item.PhysicalAddress.PostCode}
                  </div>
                  <div className="address mb-2">
                    {item.Availability.Calendar.LowestRate &&
                      `From ¥ ${item.Availability.Calendar.LowestRate}`}
                  </div>
                  <div
                    className="btn btn-primary w-100"
                    onClick={() =>
                      navigate(
                        `/product?id=${item.Id}&on_req=${item.OnRequestOnly}`
                      )
                    }
                  >
                    {t("view_details")}
                  </div>
                </div>
              </div>
            </div>
          </InfoBox>
        )}
      </Marker>
    )
  );
};

const MapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAYiScOPlZxHuI_fUGc2n5ZaUMYH9wiPnw&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withStateHandlers(
    () => ({
      isOpen: false,
    }),
    {
      onToggleOpen:
        ({ isOpen }) =>
        () => ({
          isOpen: !isOpen,
        }),
    }
  ),
  withScriptjs,
  withGoogleMap
)((props) => {
  return (
    <GoogleMap
      defaultZoom={props.zoom}
      defaultCenter={
        Array.isArray(props.markers)
          ? {
              lat: props.markers[props.number]?.Geocodes[0].Geocode.Latitude,
              lng: props.markers[props.number]?.Geocodes[0].Geocode.Longitude,
            }
          : {
              lat: props.markers.Geocodes[0].Geocode.Latitude,
              lng: props.markers.Geocodes[0].Geocode.Longitude,
            }
      }
    >
      {props.isMarkerShown && !Array.isArray(props.markers) ? (
        <Marker
          position={{
            lat: props.markers.Geocodes[0].Geocode.Latitude,
            lng: props.markers.Geocodes[0].Geocode.Longitude,
          }}
          key={props.markers.id}
          onClick={props.onToggleOpen}
          icon={
            new window.google.maps.MarkerImage(
              props.markers.IndustryCategoryGroups[0] === 0
                ? Accomodation
                : props.markers.IndustryCategoryGroups[0] === 1
                ? Activity
                : props.markers.IndustryCategoryGroups[0] === 2
                ? Restaurants
                : props.markers.IndustryCategoryGroups[0] === 3
                ? Produce
                : "",
              null /* size is determined at runtime */,
              null /* origin is 0,0 */,
              null /* anchor is bottom center of the scaled image */,
              new window.google.maps.Size(48, 48)
            )
          }
        >
          {props.isOpen && (
            <InfoBox
              defaultPosition={{
                lat: props.markers.Geocodes[0].Geocode.Latitude,
                lng: props.markers.Geocodes[0].Geocode.Longitude,
              }}
              onCloseClick={props.onToggleOpen}
              options={{ closeBoxURL: ``, enableEventPropagation: true }}
            >
              <div
                style={{
                  backgroundColor: `white`,
                  opacity: 1,
                  padding: `12px`,
                  borderRadius: "8px",
                }}
              >
                <div
                  className="infoBox"
                  style={{ fontSize: `14px`, fontColor: `#08233B` }}
                >
                  <div className="text-end">
                    <FontAwesomeIcon
                      icon={faTimes}
                      onClick={props.onToggleOpen}
                    />
                  </div>
                  <div className="image">
                    <img
                      className="mb-2"
                      src={props.markers.Images[0].Url}
                    ></img>
                    <div className="name mb-2">{props.markers.Name}</div>
                    <div className="address mb-2">
                      {props.markers.PhysicalAddress.Line1},{" "}
                      {props.markers.PhysicalAddress.City},{" "}
                      {props.markers.PhysicalAddress.PostCode}
                    </div>
                    <div className="address">
                      {props.markers.Availability.Calendar.LowestRate &&
                        `From ¥ ${props.markers.Availability.Calendar.LowestRate}`}
                    </div>
                  </div>
                </div>
              </div>
            </InfoBox>
          )}
        </Marker>
      ) : (
        props.markers.map((item, i) => {
          return <MarkerWithInfo key={i} item={item} />;
        })
      )}
    </GoogleMap>
  );
});

const Map = ({ positions, zoom }) => {
  const [numberPositions, setNumberPositions] = useState(null);

  useEffect(() => {
    Array.isArray(positions) &&
      positions.map((item, i) => {
        if (item.HasGeocodes) {
          setNumberPositions(i);
        }
      });
  }, [positions]);
  return Array.isArray(positions) && numberPositions ? (
    <MapComponent
      isMarkerShown
      markers={positions}
      number={numberPositions}
      zoom={zoom || 12}
    />
  ) : (
    <MapComponent isMarkerShown markers={positions} zoom={zoom || 12} />
  );
};

Map.propTypes = propTypes;

export default Map;
