const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()
const validateObjectId = require('../middleware/validateObjectId')
const {
    User,
    validate
} = require('../models/register')
const limiter = require('../middleware/rate-limit')
const asyncMiddleware = require('../middleware/async')
const router = express.Router();


router.get('/', limiter, asyncMiddleware(async (req, res) => {
        //check if username already exists
        const existingUser = await User.find().sort('username')
      res.send(existingUser)
        }
))
router.get('/:id', [limiter, validateObjectId], asyncMiddleware(async (req, res) => {
 
  const user = await User.findById(req.params.id);
  
  if (!user) return res.status(404).send('The User with the given name was not found.');
  
  res.send(user);
        }
))

module.exports = router;