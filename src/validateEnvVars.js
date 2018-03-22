'use strict';

const validateEnvVars = () => {
  if (!process.env.MAPS_KEY) {
    console.log(new Error('no MAPS_KEY env var'));
    process.exit(1);
  }
};

module.exports = validateEnvVars;
