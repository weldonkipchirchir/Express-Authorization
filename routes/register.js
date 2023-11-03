const express=require('express')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const _ = require('lodash');
require('dotenv').config()


const {User, validate}= require('../models/register')


const router= express.Router();

router.post('/', async(req,res)=>{
    
    try{
        // const {error} = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    const {username, password} =req.body

    //check if username already exists
    const existingUser= await User.findOne({username});
    if(existingUser){
        return res.status(400).json({message:'Username already exits'});
    }else{
    // hash the password
    const hashedPassword=await bcrypt.hash(password, 10)
    
    //create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({message: 'User registered successfully'});
    }
}catch(error){
    res.status(500).json({message:"Internal server error"})
    // res.status(500).send(error.details[0].message);
}})

module.exports=router;
