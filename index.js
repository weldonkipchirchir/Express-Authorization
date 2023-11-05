const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const register = require('./routes/register');
const login1 = require('./routes/login');
const protected = require('./routes/protected');
const Joi = require('joi');
const winston = require('winston');
require('winston-daily-rotate-file');
require("express-async-errors")
require('winston-mongodb');

const logger = winston.createLogger({
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'logfile.log',
      dirname: './logs',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
    new winston.transports.MongoDB({
      level: 'info',
      db: 'mongodb://localhost:27017/logs',
      collection: 'log',
      options: {
        useUnifiedTopology: true,
      },
    }),
  ],
});

const error = require('./middleware/error')(logger)

const app = express();
const port = process.env.PORT

process.on('uncaughtException', (err)=>{
  console.log(`Caught exception: ${err}`);
  logger.error(err.message)
})

//connect to database
mongoose.connect('mongodb://localhost:27017/auth')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));
// throw new Error('Error in index.js')


//middleware in-built
app.use(express.json())
// parsing the JSON data and making it available in a convenient req.body

app.use('/register', register)
app.use('/login', login1)
app.use('/protected', protected)

//place the error middleware after all the middleware
app.use(error)

app.listen(port || 3000, ()=>{
    console.log(`Server listening on port ${port}`)
})