const express=require('express')
const routs=express.Router()
const categoryController=require('../controllers/categoryController')

routs.get('/add_category',categoryController.add_category)
routs.post('/insert_category',categoryController.insert_category)
routs.get('/view_category',categoryController.view_category)
routs.get('/deleteRecord/:id',categoryController.deleteRecord)
routs.get('/updateRecord/:id',categoryController.updateRecord)
routs.post('/edit_category/:id',categoryController.edit_category)
routs.get('/active/:id',categoryController.active)
routs.get('/deactive/:id',categoryController.deactive)

module.exports=routs;

