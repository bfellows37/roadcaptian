import React from 'react';
import ReactDOM from 'react-dom';
import { RoadCaptainMap } from './roadcaptain-map';
import './index.css';

ReactDOM.render(
  <RoadCaptainMap
    googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places'}
    loadingElement={<div style={{height: `100%`}} />}
    containerElement={<div style={{height: `720px`}} />}
    mapElement={<div style={{height: `100%`}} />}
  />,
  document.getElementById('root')
)
