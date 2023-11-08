require('dotenv').config()
const mongoose = require('mongoose');

module.exports = function (logger) {
  // Connect to the database
  // mongoose.connect('mongodb://localhost:27017/auth')
  mongoose.connect(process.env.TEST_DB)
    .then(() => {
      if (logger && logger.info) {
        logger.info('Connected to MongoDB');
      } else {
        console.log('Connected to MongoDB');
      }
    });
};
