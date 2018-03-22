'use strict';

const defaultErrorHandler = (req, res, next, error) => {
  console.log(error);
};

module.exports = defaultErrorHandler;
