'use strict';

const router = require('express').Router();

const getRoadTrip = require('./src/api/getRoadTrip');

router.post('/roadtrip', async (req, res) => {
  const {direction, days, distancePerDay, coordinates} = req.body;
  const roadtrip = await getRoadTrip(coordinates, direction, days, distancePerDay);
  res.send(roadtrip);
});

module.exports = exports = router;
