'use strict';

const { shouldITurnAround, reverseDirection } = require('../util');
const getPoint = require('./getPoint');

/**
 * Gets a sequence of points based on input params
 * @param origin - where to begin and end
 * @param direction - which direction to start out going
 * @param days - number of days to spend on the road
 * @param distancePerDay - distance to travel per day +/- 20%
 * @returns {Promise<Array>}
 */
const getRoadTrip = async (origin, direction, days, distancePerDay) => {
  try {
    let lastEndingLocation = origin;
    let points = [];
    let didIturnAround = false;
    for (let i = 0; i < (days - 1); i++) {
      const distanceRange = [distancePerDay * 0.8, distancePerDay * 1.2];
      const point = await getPoint(lastEndingLocation, direction, distanceRange);
      points.push(point);
      lastEndingLocation = point.gps.coordinates;
      const turnAround = !didIturnAround && shouldITurnAround(days - 1, i + 1);
      console.log('turnAround', turnAround);
      console.log('direction', direction);
      if (turnAround) {
        direction = reverseDirection(direction);
        didIturnAround = true;
      }
    }
    return points;
  } catch (e) {
    console.log(e);
    return [];
  }
};

module.exports = exports = getRoadTrip;
