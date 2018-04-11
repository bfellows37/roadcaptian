import React from 'react';
import {withGoogleMap, withScriptjs, GoogleMap, Polyline} from 'react-google-maps';

const RoadCaptainMap = withScriptjs(withGoogleMap(props => {
  const {position, route} = props;
  let path = route.map(point => ({lat: point[0], lng: point[1]}));
  console.log('path', path);
  return (
    <GoogleMap
      defaultZoom={5}
      defaultCenter={position}
    >
      <Polyline
        geodesic={true}
        path={path}
      />
    </GoogleMap>
  );
}));

export { RoadCaptainMap };
