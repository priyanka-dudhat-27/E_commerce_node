const subcatModel=require('../models/subcatModel')
const moment=require('moment')

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
        req.body.status = true;
        req.body.created_date = moment().format("LLL");
        req.body.updated_date = moment().format("LLL");
        let subcatData = await subcatModel.create(req.body);
        if (subcatData) {
          req.flash("success", "subCategory Record inserted successfully");
          return res.redirect("/admin/subCategory/add_subCategory");
        } else {
          req.flash("error", "wrong");
          return res.redirect("/admin/subCategory/add_subCategory");
        }    }catch(error){
        console.log(error)
        req.flash('error','something wrong')
        return res.redirect('back')
    }
}
module.exports.view_subCategory = async (req, res) => {
    try {
      // search
      var search = "";
      if (req.query.search) {
        search = req.query.search;
      }
  
      // pagination
      var page = 0;
      var per_page = 2;
  
      let allRecord = await subcatModel.find({
        subCat_name: { $regex: search, $options: "i" },
      }).countDocuments();
  
      let totalpage = Math.ceil(allRecord / per_page);
  
      if (req.query.page) {
        page = req.query.page;
      }
  
      let subcatData = await subcatModel.find({
        subCat_name: { $regex: search, $options: "i" },
      })
      .skip(page*per_page)
      .limit(per_page)
      if (subcatData) {
        return res.render("view_subCategory", {
          subcatData: subcatData,
          search: search,
          totalpage: totalpage,
          currentPage: page,
          per_page: per_page,
        });
      } else {
        req.flash("error", "Record not found");
        return res.redirect("back");
      }
    } catch (err) {
      console.log(err);
      req.flash("error", "Record not found");
      return res.redirect("back");
    }
  };