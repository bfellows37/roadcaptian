'use strict';

/**
 * @param days
 * @param currentDay
 * @returns {boolean}
 */
const shouldITurnAround = (days, currentDay) => currentDay >= (days / 2);

/**
 * @param currentDirection
 * @returns {string|null}
 */
const reverseDirection = (currentDirection) => {
  switch (currentDirection) {
    case 'n':
    case 'N':
    case 'north':
    case 'North':
    case 'NORTH':
      return 's';
    case 's':
    case 'S':
    case 'south':
    case 'South':
    case 'SOUTH':
      return 'n';
    case 'w':
    case 'W':
    case 'west':
    case 'West':
    case 'WEST':
      return 'e';
    case 'e':
    case 'E':
    case 'east':
    case 'East':
    case 'EAST':
      return 'w';
    default:
      return null;
  }
};

module.exports = { shouldITurnAround, reverseDirection };
