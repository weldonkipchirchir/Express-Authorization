const winston = require('winston');
require('winston-daily-rotate-file');
require('winston-mongodb');
const mongoose = require('mongoose');


module.exports = function (logger) {
    return function (err, req, res, next) {
      logger.error(err.message);
      res.status(500).send('Something failed.');
    };
  };