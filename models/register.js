const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

//Define a schema
const userSchema = new mongoose.Schema({
    username:{type:String,
    required:true,
    minlength: 5,
    maxlength:50
},
    password: String,
})

const User = mongoose.model('User', userSchema);

// using Joi to validate input
// function validateUser(user) {
//     const schema = Joi.object({
//       name: Joi.string().min(5).max(50).required(),
//       password: Joi.string().min(5).max(255).required()
//     });
  
//     return Joi.validate(user, schema);
//   }

exports.User=User;
// exports.validate=validateUser;