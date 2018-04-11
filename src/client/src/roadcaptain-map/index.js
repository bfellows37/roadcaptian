import React from 'react';
import {withGoogleMap, withScriptjs, GoogleMap, Marker, Polyline} from 'react-google-maps';

const RoadCaptainMap = withScriptjs(withGoogleMap(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{lat: 42, lng: -122}}
  >
    <Marker
      position={{lat: 42, lng: -122}}
    />
  </GoogleMap>
)));

export { RoadCaptainMap };
