const Admin = require("../models/adminModel");
const path = require("path");
const fs = require("fs");
const moment = require("moment");

module.exports.dashboard = async (req, res) => {
  try {
    return res.render("dashboard");
  } catch (error) {
    console.log(error);
  }
};
module.exports.add_admin = async (req, res) => {
  try {
    return res.render("add_admin");
  } catch (error) {
    console.log(error);
  }
};
module.exports.view_admin = async (req, res) => {
  try {
    // search
    var search = "";
    if (req.query.search) {
      search = req.query.search;
    }

    // searching with pagination
    var page = 0;
    var per_page = 2;

    let allRecord = await Admin.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    }).countDocuments();

    let totalpage = Math.ceil(allRecord / per_page);

    console.log(totalpage);

    if (req.query.page) {
      page = req.query.page;
    }

    let adminData = await Admin.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    })
      .skip(page * per_page)
      .limit(per_page);

    return res.render("view_admin", {
      adminRecord: adminData,
      adminData: req.user,
      search: search,
      totalpage: totalpage,
      currentPage: page,
      per_page: per_page,
    });
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

module.exports.insert_admin = async (req, res) => {
  try {
    // console.log(req.body);
    // console.log(req.file);
    var img = "";
    if (req.file) {
      img = Admin.iPath + "/" + req.file.filename;
    }
    req.body.name = req.body.fname + " " + req.body.lname;
    req.body.image = img;
    req.body.status = true;
    req.body.created_date = moment().format("LLL");
    let adminData = await Admin.create(req.body);
    if (adminData) {
      console.log("Admin Record inserted");
      return res.redirect("/admin/add_admin");
    } else {
      console.log("something is wrong!");
      return res.redirect("/admin/add_admin");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/admin/add_admin");
  }
};
module.exports.deleteRecord = async (req, res) => {
  try {
    let single = await Admin.findById(req.params.id);
    if (single) {
      let imagePath = path.join(__dirname, "..", single.image);
      await fs.unlinkSync(imagePath);
    } else {
      console.log("wrong!");
      return res.redirect("back");
    }
    let del = await Admin.findByIdAndDelete(req.params.id);
    if (del) {
      console.log(del);
      // req.flash('success','Record deleted successfully')
      return res.redirect("back");
    } else {
      // req.flash('error','record not deleted from db')
      console.log("something wrong!");
    }
  } catch (err) {
    console.log(err);
    // req.flash('error','Record not found')
    return res.redirect("back");
  }
};
module.exports.updateRecord = async (req, res) => {
  let singleData = await Admin.findById(req.params.id);
  return res.render("edit_admin", {
    singleData: singleData,
  });
};
module.exports.edit_admin = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);
    if (req.file) {
      let findData = await Admin.findById(req.params.id);
      if (findData) {
        let imagePath = path.join(__dirname, "..", findData.image);
        await fs.unlinkSync(imagePath);
      }
      var img = "";
      img = Admin.iPath + "/" + req.file.filename;
      req.body.image = img;
    } else {
      let findData = await Admin.findById(req.params.id);
      if (findData) {
        req.body.image = findData.image;
        req.body.name = req.body.fname + " " + req.body.lname;
      }
    }
    await Admin.findByIdAndUpdate(req.params.id, req.body);
    return res.redirect("/admin/view_admin");
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

// delete muktiple
module.exports.deleteMultiple = async (req, res) => {
  try {
    console.log(req.body);
    let delmultiple = await Admin.deleteMany({
      _id: { $in: req.body.adminIds },
    });
    if (delmultiple) {
      // req.flash('success','multiple records deleted')
      return res.redirect("back");
    } else {
      // req.flash('error','something wrong');
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
  }
};

// ative & deactive
module.exports.deactive = async (req, res) => {
    try {
      let adminDeactive = await Admin.findByIdAndUpdate(req.params.id, {
        status: false,
      });
      if (adminDeactive) {
        // req.flash("success", "Admin deactivated successfully");
        return res.redirect("/admin/view_admin");
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
      let adminActive = await Admin.findByIdAndUpdate(req.params.id, {
        status: true,
      });
      if (adminActive) {
        // req.flash("success", "Admin activated successfully");
        return res.redirect("/admin/view_admin");
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
  