const express = require('express');
const routs=express.Router();
const adminController = require('../controllers/adminController')
const Admin=require('../models/adminModel')

routs.get('/dashboard',adminController.dashboard)
routs.get('/add_admin',adminController.add_admin)
routs.get('/view_admin',adminController.view_admin)
routs.post('/insert_admin',Admin.uploadImage,adminController.insert_admin);
routs.get('/deleteRecord/:id',adminController.deleteRecord);
routs.get('/updateRecord/:id',adminController.updateRecord);
routs.post('/edit_admin/:id',Admin.uploadImage,adminController.edit_admin);
routs.post('/deleteMultiple',adminController.deleteMultiple)
routs.get('/deactive/:id',adminController.deactive)
routs.get('/active/:id',adminController.active)
module.exports=routs;