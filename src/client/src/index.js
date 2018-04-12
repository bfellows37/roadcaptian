import React from 'react';
import ReactDOM from 'react-dom';
import { RoadCaptainMap } from './roadcaptain-map';
import './index.css';

const getTrip = async (opts) => {
  return fetch('/api/roadtrip', {
    body: JSON.stringify(opts),
    cache: 'no-cache',
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST'
  }).then(response => response.json());
};

const main = async () => {
  try {
    const trip = await getTrip({
      direction: 's',
      days: '5',
      distancePerDay: 200,
      coordinates: [-122.32, 47.83]
    });
    ReactDOM.render(
      <RoadCaptainMap
        position={{lat: trip.roadtrip[0].gps.coordinates[1], lng: trip.roadtrip[0].gps.coordinates[0]}}
        route={trip.decoded}
        googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places'}
        loadingElement={<div style={{height: `100%`}} />}
        containerElement={<div style={{height: `720px`}} />}
        mapElement={<div style={{height: `100%`}} />}
      />,
      document.getElementById('root')
    );
  } catch (e) {
    throw new Error('oops');
  }
}
main().catch(e => {
  ReactDOM.render(
    <div>oops</div>, document.getElementById('root')
  );
});
