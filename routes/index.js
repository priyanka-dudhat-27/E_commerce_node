const express = require('express');
const routs=express.Router();

routs.use('/admin',require('./admin'))

module.exports=routs;