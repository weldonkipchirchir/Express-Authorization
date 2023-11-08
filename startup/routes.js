const express = require('express')
const register = require('../routes/register');
const login1 = require('../routes/login');
const protecte = require('../routes/protected')
const users = require('../routes/users')
const mongoose = require('mongoose')
const winston = require('winston');
require('winston-daily-rotate-file');
require("express-async-errors")
// require('winston-mongodb');

module.exports=function(app){
 //middleware in-built
app.use(express.json())
// parsing the JSON data and making it available in a convenient req.body

app.use('/register', register)
app.use('/login', login1)
app.use('/protected', protecte)
app.use('/users', users)
// Set the view engine to Pug
app.set('view engine', 'pug');
app.set('views', './views'); // Specify the directory where your Pug templates are located

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
      // new winston.transports.MongoDB({
      //   level: 'info',
      //   db: 'mongodb://localhost:27017/logs',
      //   collection: 'log',
      //   options: {
      //     useUnifiedTopology: true,
      //   },
      // }),
    ],
  });
  
  const error = require('../middleware/error')(logger)
  require('./db')(logger)

  
  //synchronus errors
  process.on('uncaughtException', (err)=>{
    // console.log(`Caught exception: ${err}`);
    logger.error(err.message)
    // process.exit(1)
  })
  
  //asynchronus errors
  process.on('unhandledRejection', (err)=>{
    console.log(`unhandled rejection: ${err}`);
    logger.error(err.message)
  })
  
  
  // throw errors
    // throw new Error('Error in index.js')
//   const p = Promise.reject(new Error('Somethimg has failed miserably!'))
//   p.then(()=>{console.log("Done ")})
  
  //place the error middleware after all the middleware
  app.use(error)

//place the error middleware after all the middleware
}