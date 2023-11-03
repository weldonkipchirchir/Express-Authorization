const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const register = require('./routes/register');
const login1 = require('./routes/login');
const protected = require('./routes/protected');

const app = express();
const port = process.env.PORT

//connect to database
mongoose.connect('mongodb://localhost:27017/auth')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

//middleware in-built
app.use(express.json())
// parsing the JSON data and making it available in a convenient req.body

app.use('/register', register)
app.use('/login', login1)
app.use('/protected', protected)

app.listen(port || 3000, ()=>{
    console.log(`Server listening on port ${port}`)
})