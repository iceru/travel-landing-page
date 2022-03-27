import React, { useState } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from "react-google-maps";
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
// import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import PropTypes from "prop-types";
import { compose, withProps, withStateHandlers, withHandlers } from "recompose";

import "./style.scss";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";

/* eslint-disable */

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

  return (
    <Marker
      position={{
        lat: item.Geocodes && item.Geocodes[0].Geocode.Latitude,
        lng: item.Geocodes && item.Geocodes[0].Geocode.Longitude,
      }}
      key={item.id}
      onClick={onToggleOpen}
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
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      debugger;
      const clickedMarkers = markerClusterer.getMarkers();
      console.log(`Current clicked markers length: ${clickedMarkers.length}`);
      console.log(clickedMarkers);
    },
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
              lat: props.markers[0].Geocodes[0].Geocode.Latitude,
              lng: props.markers[0].Geocodes[0].Geocode.Longitude,
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
        props.markers.map((item) => {
          return <MarkerWithInfo item={item} />;
        })
      )}
    </GoogleMap>
  );
});

const Map = ({ positions, zoom }) => {
  console.log(positions);
  // const [zoomMap, setZoomMap] = useState(10);
  // const [bounds, setBounds] = useState(null);

  // const points = positions.map((position) => ({
  //   type: "Feature",
  //   properties: {
  //     cluster: false,
  //     id: positions.Id,
  //   },
  // }));
  // const { clusters } = useSupercluster({
  //   points,
  //   bounds,
  //   zoom,
  //   options: { radius: 75, maxZoom: 20 },
  // });
  return (
    <>
      <MapComponent isMarkerShown markers={positions} zoom={zoom || 12} />
    </>
  );
};

Map.propTypes = propTypes;

export default Map;
