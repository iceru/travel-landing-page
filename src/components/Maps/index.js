import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from "react-google-maps";
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
import PropTypes from "prop-types";
import { compose, withProps, withStateHandlers } from "recompose";

import "./style.scss";

const propTypes = {
  positions: PropTypes.array,
  zoom: PropTypes.number,
};

const MapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
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
        Array.isArray(props.positions)
          ? {
              lat: props.positions[0].Geocodes[0].Geocode.Latitude,
              lng: props.positions[0].Geocodes[0].Geocode.Longitude,
            }
          : {
              lat: props.positions.Geocodes[0].Geocode.Latitude,
              lng: props.positions.Geocodes[0].Geocode.Longitude,
            }
      }
    >
      {props.isMarkerShown && !Array.isArray(props.positions) ? (
        <>
          <Marker
            position={{
              lat: props.positions.Geocodes[0].Geocode.Latitude,
              lng: props.positions.Geocodes[0].Geocode.Longitude,
            }}
            key={props.positions.id}
            onClick={props.onToggleOpen}
          >
            {props.isOpen && (
              <InfoBox
                defaultPosition={{
                  lat: props.positions.Geocodes[0].Geocode.Latitude,
                  lng: props.positions.Geocodes[0].Geocode.Longitude,
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
                    <div className="image">
                      <img
                        className="mb-2"
                        src={props.positions.Images[0].Url}
                      ></img>
                      <div className="name mb-2">{props.positions.Name}</div>
                      <div className="address mb-2">
                        {props.positions.PhysicalAddress.Line1},{" "}
                        {props.positions.PhysicalAddress.City},{" "}
                        {props.positions.PhysicalAddress.PostCode}
                      </div>
                      <div className="address">
                        {props.positions.Availability.Calendar.LowestRate &&
                          `From ¥ ${props.positions.Availability.Calendar.LowestRate}`}
                      </div>
                    </div>
                  </div>
                </div>
              </InfoBox>
            )}
          </Marker>
        </>
      ) : (
        props.positions.map((item) => {
          return (
            <Marker
              position={{
                lat: item.Geocodes && item.Geocodes[0].Geocode.Latitude,
                lng: item.Geocodes && item.Geocodes[0].Geocode.Longitude,
              }}
              key={item.id}
              onClick={props.onToggleOpen}
            >
              {props.isOpen && (
                <InfoBox
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
                      <div className="image">
                        <img
                          className="mb-2"
                          src={item.Images && item.Images[0].Url}
                        ></img>
                        <div className="name mb-2">{item.Name}</div>
                        <div className="address mb-2">
                          {item.PhysicalAddress.Line1},{" "}
                          {item.PhysicalAddress.City},{" "}
                          {item.PhysicalAddress.PostCode}
                        </div>
                        <div className="address">
                          {item.Availability.Calendar.LowestRate &&
                            `From ¥ ${item.Availability.Calendar.LowestRate}`}
                        </div>
                      </div>
                    </div>
                  </div>
                </InfoBox>
              )}
            </Marker>
          );
        })
      )}
    </GoogleMap>
  );
});

const Map = ({ positions, zoom }) => {
  console.log(positions);
  console.log(Array.isArray(positions));
  return (
    <>
      <MapComponent isMarkerShown positions={positions} zoom={zoom || 12} />
    </>
  );
};

Map.propTypes = propTypes;

export default Map;
