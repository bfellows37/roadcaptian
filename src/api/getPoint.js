'use strict';
const fetch = require('node-fetch');
const Location = require('../data/models/Location');

const milesToMeters = miles => miles * 1609.34;

const getQueryDirectionMod = (direction, origin) => {
  switch (direction) {
    case 'n':
    case 'N':
    case 'north':
    case 'North':
    case 'NORTH':
      return {'gps.coordinates.1': {$gte: origin[1]}};
    case 's':
    case 'S':
    case 'south':
    case 'South':
    case 'SOUTH':
      return {'gps.coordinates.1': {$lte: origin[1]}};
    case 'w':
    case 'W':
    case 'west':
    case 'West':
    case 'WEST':
      return {'gps.coordinates.0': {$lte: origin[0]}};
    case 'e':
    case 'E':
    case 'east':
    case 'East':
    case 'EAST':
      return {'gps.coordinates.0': {$gte: origin[0]}};
    default:
      return null;
  }
};

/**
 *
 * @param {array} origin
 * @param {null|string} direction
 * @param {Number[]} distanceRange
 * @returns {Promise<mongoose.model[]>}
 */
const getPoint = (origin, direction = null, distanceRange = [0, 100000]) => {
  const query = {
    $and: []
  };
  if (direction) {
    const queryDirectionMod = getQueryDirectionMod(direction, origin);
    if (queryDirectionMod) {
      query.$and.push(queryDirectionMod);
    }
  }
  distanceRange = distanceRange.map(value => milesToMeters(value));
  query.$and.push({
    gps: {
      $near: {
        $geometry: {type: 'point', coordinates: origin},
        $minDistance: distanceRange[0],
        $maxDistance: distanceRange[distanceRange.length - 1]
      }
    }
  });

  return new Promise((resolve, reject) => {
    Location.find(query, null, {limit: 100}, async (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.length) {
          const params = results.reduce((pv, cv) => {
            const acc = typeof pv === 'object' ? `${pv.gps.coordinates[1]},${pv.gps.coordinates[0]}` : pv;
            return `${acc}|${cv.gps.coordinates[1]},${cv.gps.coordinates[0]}`;
          });
          const resultsWithPlaceIds = results.filter(place => place.placeId === false || place.placeId);
          let isGoogleCalled = false;
          if (resultsWithPlaceIds.length !== results.length) {
            console.log('need to call google ' + `${resultsWithPlaceIds.length}/${results.length}`);
            isGoogleCalled = true;
            const googleUrl = `https://roads.googleapis.com/v1/nearestRoads?points=${params}&key=${process.env.MAPS_KEY}`;
            const nearestRoads = await fetch(googleUrl).then(res => res.json());
            if (nearestRoads && nearestRoads.snappedPoints && nearestRoads.snappedPoints.length) {
              nearestRoads.snappedPoints.forEach(value => {
                results[value.originalIndex].placeId = value.placeId;
              });
            }
          } else {
            console.log('no need to call google');
          }
          const filteredResults = results.filter(result => result.placeId && result.placeId !== 'false');
          const pickOne = Math.floor(Math.random() * filteredResults.length);
          resolve(filteredResults[pickOne]);
          if (isGoogleCalled) {
            results.forEach(result => {
              if (!result.placeId) {
                result.placeId = false;
              }
              result.save();
            });
          }
        } else {
          resolve([]);
        }
      }
    });
  });
};

module.exports = getPoint;
