import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';
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
  const trip = await getTrip({
    direction: 's',
    days: '5',
    distancePerDay: 200,
    coordinates: [-122.32, 47.83]
  });
  ReactDOM.render(
    <App {...trip}/>,
    document.getElementById('root')
  );
}
main();
