'use strict';

const Location = require('../data/models/Location');

const getQueryDirectionMod = (direction, origin) => {
    switch(direction) {
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
 * @returns {Promise<mongoose.model>}
 */
const getPoint = (origin, direction=null, distanceRange=[0,100000]) => {
    const query = {
        $and: [],
    };
    if(direction){
        const queryDirectionMod = getQueryDirectionMod(direction, origin);
        if(queryDirectionMod){
            query.$and.push(queryDirectionMod);
        }
    }
    query.$and.push({
        gps: {
            $near: {
                $geometry: {type: 'point', coordinates: origin},
                $minDistance: distanceRange[0],
                $maxDistance: distanceRange[distanceRange.length-1],
            },
        }
    });

    return new Promise((resolve, reject) => {
        Location.find(query, (error, results) => {
            if(error) { reject(error); }
            else { resolve(results); }
        });
    });
};

module.exports = getPoint;