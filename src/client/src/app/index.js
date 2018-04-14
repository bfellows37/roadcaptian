import React from 'react';
import {RoadCaptainMap} from '../roadcaptain-map';

const App = props => {
  const trip = props;
  return (
    <div>
      <RoadCaptainMap
        position={{lat: trip.roadtrip[0].gps.coordinates[1], lng: trip.roadtrip[0].gps.coordinates[0]}}
        route={trip.decoded}
        googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places'}
        loadingElement={<div style={{height: `100%`}} />}
        containerElement={<div style={{height: `720px`}} />}
        mapElement={<div style={{height: `100%`}} />}
      />
    </div>
  );
};

export { App };
