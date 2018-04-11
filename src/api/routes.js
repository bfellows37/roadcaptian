'use strict';
const router = require('express').Router();
const getRoadTrip = require('./getRoadTrip');
const request = require('superagent');
const polyline = require('@mapbox/polyline');

router.post('/roadtrip', async (req, res) => {
  const {direction, days, distancePerDay, coordinates} = req.body;
  const roadtrip = await getRoadTrip(coordinates, direction, days, distancePerDay);
  const directions = await request.get('https://maps.googleapis.com/maps/api/directions/json?origin=47.83,-122.32&destination=47.83,-122.32&waypoints=46.041384,-118.4637513|45.6413243, -113.6431247')
  const encoded = directions.body.routes[0].overview_polyline.points;
  const decoded = polyline.decode(encoded)
  res.json({roadtrip, directions, encoded, decoded});
});

module.exports = exports = router;
