const subcatModel=require('../models/subcatModel')

module.exports.add_subCategory=async(req,res)=>{
    try{
        return res.render('add_subCategory')
    }catch(error){
        console.log(error)
        req.flash('error','something wrong')
        return res.redirect('back')
    }
}

module.exports.insert_subCategory=async(req,res)=>{
    try{
        console.log(req.body)
    }catch(error){
        console.log(error)
        req.flash('error','something wrong')
        return res.redirect('back')
    }
}
module.exports.view_subCategory=async(req,res)=>{
    try{
        let subcatData=await subcatModel.find();
        return res.render('view_subCategory',{
            subcatData:subcatData
        })
    }catch(error){
        console.log(error)
        req.flash('error','something wrong')
        return res.redirect('back')
    }
}