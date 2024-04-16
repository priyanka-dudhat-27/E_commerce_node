const express=require('express')
const routs=express.Router();
const subcatController=require('../controllers/subcatController')

routs.get('/add_subCategory',subcatController.add_subCategory);
routs.get('/view_subCategory',subcatController.view_subCategory);
routs.post('/insert_subCategory',subcatController.insert_subCategory)
module.exports=routs;