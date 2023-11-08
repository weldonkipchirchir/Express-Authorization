const express = require('express')
require('dotenv').config()
const app = express();
const port = process.env.PORT

require('./startup/routes')(app)
require('./startup/db')();

const server = app.listen(port || 3000, ()=>{
    console.log(`Server listening on port ${port}`)
})
module.exports = server;