const express = require('express')
const mongoose = require('mongoose');
const authenticateToken = require('../middleware/protected')
const router = express.Router();
const key = process.env.SECRET_KEY

router.get('/', authenticateToken, (req, res) => {
    res.json({ message: 'Protected route' });
  });

  module.exports=router;