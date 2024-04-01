const express = require('express');
const routs=express.Router();
const adminController = require('../controllers/adminController')
const Admin=require('../models/adminModel');
const passport = require('passport');

routs.get('/',adminController.login)
routs.post('/signIn',passport.authenticate('local',{failureRedirect:'/admin/'}),adminController.signIn)
routs.get('/dashboard',passport.checkAuth,adminController.dashboard)
routs.get('/add_admin',passport.checkAuth,adminController.add_admin)
routs.get('/view_admin',passport.checkAuth,adminController.view_admin)
routs.post('/insert_admin',passport.checkAuth,Admin.uploadImage,adminController.insert_admin);
routs.get('/deleteRecord/:id',passport.checkAuth,adminController.deleteRecord);
routs.get('/updateRecord/:id',passport.checkAuth,adminController.updateRecord);
routs.post('/edit_admin/:id',passport.checkAuth,Admin.uploadImage,adminController.edit_admin);
routs.post('/deleteMultiple',adminController.deleteMultiple)
routs.get('/deactive/:id',adminController.deactive)
routs.get('/active/:id',adminController.active)
routs.get('/profile',passport.checkAuth,adminController.profile)
routs.get('/change_password',passport.checkAuth,adminController.change_password)
routs.post('/resetPass',passport.checkAuth,adminController.resetPass)
module.exports=routs;