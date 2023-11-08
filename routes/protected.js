const express = require('express')
const mongoose = require('mongoose');
const authenticateToken = require('../middleware/protected')
const limiter = require('../middleware/rate-limit')

const router = express.Router();
const key = process.env.SECRET_KEY

router.get('/', [limiter, authenticateToken], (req, res) => {
  res.render('index', { title: 'Admin Dashboard', message: 'Welcome Admin!' });
    // res.json({ message: 'Protected route' });
  });

  module.exports=router;