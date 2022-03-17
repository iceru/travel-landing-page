import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from "react-google-maps";
import PropTypes from "prop-types";
import { compose, withProps } from "recompose";

const propTypes = {
  positions: PropTypes.array,
};

const MapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `500px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{
        lat: props.positions[0].Geocode.Latitude,
        lng: props.positions[0].Geocode.Longitude,
      }}
    >
      {props.isMarkerShown &&
        props.positions.map((marker) => (
          <Marker
            position={{
              lat: marker.Geocode.Latitude,
              lng: marker.Geocode.Longitude,
            }}
            key={marker.id}
          />
        ))}
    </GoogleMap>
  );
});

const Map = ({ positions }) => {
  return (
    <>
      <MapComponent isMarkerShown positions={positions} />
    </>
  );
};

Map.propTypes = propTypes;

export default Map;
