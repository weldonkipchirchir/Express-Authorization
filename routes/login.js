const express = require('express')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const _ = require('lodash');
require('dotenv').config()
const jwt = require('jsonwebtoken')
const {User, validate}= require('../models/register')
const router = express.Router();
const limiter = require('../middleware/rate-limit')

const key = process.env.SECRET_KEY

router.post('/', limiter, async (req, res) => {
    try {
        const { username, password } = req.body;

        //find the user by username
        const user= await User.findOne({username})
        if(!user){
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        //compare the password
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
          }
        
          //generate a jWT token
          const token = jwt.sign({user: user._id}, key,{expiresIn: '1h'} )

        //   res.json({token});
          res.header('x-auth-token', token).send({message:'logged in successfully'});

    } catch (error) {
    console.error(error);
       res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports=router;