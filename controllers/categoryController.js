const Category = require("../models/categoryModel");
const moment = require("moment");
const { search } = require("../routes");
module.exports.add_category = async (req, res) => {
  try {
    return res.render("add_category");
  } catch (err) {
    console.log(err);
    req.flash("error", "Record not found");
    return res.redirect("back");
  }
};

module.exports.view_category = async (req, res) => {
  try {
    // search
    var search = "";
    if (req.query.search) {
      search = req.query.search;
    }

    // pagination
    var page = 0;
    var per_page = 2;

    let allRecord = await Category.find({
      name: { $regex: search, $options: "i" },
    }).countDocuments();

    let totalpage = Math.ceil(allRecord / per_page);

    if (req.query.page) {
      page = req.query.page;
    }

    let catData = await Category.find({
      category_name: { $regex: search, $options: "i" },
    })
    .skip(page*per_page)
    .limit(per_page)
    if (catData) {
      return res.render("view_category", {
        catData: catData,
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

module.exports.insert_category = async (req, res) => {
  try {
    req.body.status = true;
    req.body.created_date = moment().format("LLL");
    req.body.updated_date = moment().format("LLL");
    let catData = await Category.create(req.body);
    if (catData) {
      req.flash("success", "Category Record inserted successfully");
      return res.redirect("/admin/category/add_category");
    } else {
      req.flash("error", "wrong");
      return res.redirect("/admin/category/add_category");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};
module.exports.deleteRecord = async (req, res) => {
  try {
    let catData = await Category.findById(req.params.id);
    if (catData) {
      let del = await Category.findByIdAndDelete(req.params.id);
      if (del) {
        req.flash("success", "Record deleted successfully");
        return res.redirect("back");
      } else {
        req.flash("error", "record not deleted from db");
        console.log("something wrong!");
      }
    }else{
      req.flash("error", "Record not found");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    req.flash("error", "Record not found");
    return res.redirect("back");
  }
};
module.exports.updateRecord = async (req, res) => {
  let singleData = await Category.findById(req.params.id);
  return res.render("edit_category", {
    singleData: singleData,
  });
};
module.exports.edit_category = async (req, res) => {
  try {
    console.log(req.params.id);
    req.body.updated_date = moment().format("LLL");
    let upData=await Category.findByIdAndUpdate(req.params.id, req.body);
    if(upData){
      return res.redirect("/admin/category/view_category");
    }else{
      req.flash("error", "Record not updated");
      return res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};

// delete multiple
module.exports.deleteMultiple = async (req, res) => {
  try {
    console.log(req.body);
    let delmultiple = await Category.deleteMany({
      _id: { $in: req.body.catIds },
    });
    if (delmultiple) {
      // req.flash('success','multiple records deleted')
      return res.redirect("back");
    } else {
      // req.flash('error','something wrong');
      return res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};

// ative & deactive
module.exports.deactive = async (req, res) => {
  try {
    let catDeactive = await Category.findByIdAndUpdate(req.params.id, {
      status: false,
    });
    if (catDeactive) {
      req.flash("success", "Admin deactivated successfully");
      return res.redirect("/admin/category/view_category");
    } else {
      req.flash("error", "something wrong");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};
module.exports.active = async (req, res) => {
  try {
    let catActive = await Category.findByIdAndUpdate(req.params.id, {
      status: true,
    });
    if (catActive) {
      req.flash("success", "category activated successfully");
      return res.redirect("/admin/category/view_category");
    } else {
      req.flash("error", "something wrong");
      return res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};
