'use strict';
const router = require('express').Router();
const getRoadTrip = require('./getRoadTrip');
const request = require('superagent');
const polyline = require('@mapbox/polyline');

router.post('/roadtrip', async (req, res) => {
  const {direction, days, distancePerDay, coordinates} = req.body;
  const roadtrip = await getRoadTrip(coordinates, direction, days, distancePerDay);
  const originString = `${coordinates[1]},${coordinates[0]}`;
  const destinationString = `${coordinates[1]},${coordinates[0]}`;
  const waypoints = roadtrip.slice(1, roadtrip.length);
  const waypointsCoords = waypoints.map(point => `${point.gps.coordinates[1]},${point.gps.coordinates[0]}`);
  const waypointString = waypointsCoords.reduce((a, v) => `${a}|${v}`);
  let directions;
  try {
    directions = await request.get(`https://maps.googleapis.com/maps/api/directions/json?avoid=highways&origin=${originString}&destination=${destinationString}&waypoints=${waypointString}`);
  } catch (e) {
    console.log(e);
    return res.json(e);
  }
  console.log(directions.body.routes.length);
  if (directions.body.routes.length) {
    const encoded = directions.body.routes[0].overview_polyline.points;
    const decoded = polyline.decode(encoded);
    return res.json({roadtrip, directions, encoded, decoded});
  } else {
    return res.status(500);
  }

});

module.exports = exports = router;
