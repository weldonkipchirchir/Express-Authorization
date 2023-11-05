const express = require('express')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const _ = require('lodash');
require('dotenv').config()
const Joi = require('joi');
const {
    User,
    validate
} = require('../models/register')
const limiter = require('../middleware/rate-limit')

const asyncMiddleware = require('../middleware/async')
const router = express.Router();


const schema = Joi.object({
    username: Joi.string().alphanum().min(5).max(30).required(),
    password: Joi.string().min(5).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

router.post('/', limiter, asyncMiddleware(async (req, res) => {
        // throw new Error('Could not get user')

        const {
            error
        } = schema.validate(req.body);
        // Handle Joi validation error
        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(', ');
            return res.status(400).json({
                message: errorMessage
            });
        }
        const {
            username,
            password
        } = req.body

        //check if username already exists
        const existingUser = await User.findOne({
            username
        });
        if (existingUser) {
            return res.status(400).json({
                message: 'Username already exits'
            });
        } else {
            // hash the password
            const hashedPassword = await bcrypt.hash(password, 10)

            //create a new user
            const newUser = new User({
                username,
                password: hashedPassword
            });
            await newUser.save();
            res.status(201).json({
                message: 'User registered successfully'
            });
        }
    }
))

module.exports = router;