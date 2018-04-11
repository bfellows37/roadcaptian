import React from 'react';
import ReactDOM from 'react-dom';
import { RoadCaptainMap } from './roadcaptain-map';
import './index.css';

const getTrip = async () => fetch('/api/roadtrip', {
  body: JSON.stringify({
    direction: 's',
    days: '5',
    distancePerDay: 200,
    coordinates: [-122.32, 47.83]
  }), // must match 'Content-Type' header
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  headers: {
    'content-type': 'application/json'
  },
  method: 'POST'
});

getTrip().then(response => response.json()).then((response) => {
  ReactDOM.render(
    <RoadCaptainMap
      position={{lat: response.roadtrip[0].gps.coordinates[1], lng: response.roadtrip[0].gps.coordinates[0]}}
      route={response.decoded}
      googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places'}
      loadingElement={<div style={{height: `100%`}} />}
      containerElement={<div style={{height: `720px`}} />}
      mapElement={<div style={{height: `100%`}} />}
    />,
    document.getElementById('root')
  );
});
