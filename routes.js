'use strict';

const router = require('express').Router();

const getRoadTrip = require('./src/api/getRoadTrip');

router.post('/roadtrip', async (req, res) => {
  const {direction, days, distancePerDay} = req.body;
  const roadtrip = await getRoadTrip([-122.32, 47.83], direction, days, distancePerDay);
  res.send(roadtrip);
});

module.exports = exports = router;
