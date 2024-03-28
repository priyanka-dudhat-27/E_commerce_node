const express = require('express');
const routs=express.Router();
const adminController = require('../controllers/adminController')

routs.get('/dashboard',adminController.dashboard)
routs.get('/add_admin',adminController.add_admin)
module.exports=routs;