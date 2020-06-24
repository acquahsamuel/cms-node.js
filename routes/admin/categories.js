const express = require("express");
const faker = require("faker");
const router = express.Router();
const Category = require("../../models/Category");
const {userAuthenticated} = require("../../helpers/authentication");


router.all("/*", userAuthenticated, (req, res, next) => {
  req.app.locals.layout = "admin";
  next();
});

router.get("/", (req, res) => {
  Category.find({})
    .lean()
    .then(categories => {
      res.render("admin/categories/index", {
        categories: categories
      });
    });
});

router.post("/create", (req, res) => {
  const newCategory = new Category({
    name: req.body.name
  });

  newCategory.save().then(savedCategories => {
    res.redirect("/admin/categories");
  });
});

router.get("/edit/:_id", (req, res) => {
  Category.findOne({
    _id: req.params._id
  })
    .lean()
    .then(category => {
      res.render("admin/categories/edit", {
        category: category
      });
    });
});

router.put("/edit/:_id", (req, res) => {
  Category.findOne({
    _id: req.params._id
  }).then(category => {
    category.name = req.body.name;
    category.save().then(updatedCategory => {
      res.redirect("/admin/categories");
    });
  });
});


router.delete("/:_id", (req, res) => {
    Category.findOne({
      _id: req.params._id
    }).then(category => {
        category.remove();
        res.redirect("/admin/categories");
      });
  });


  
module.exports = router;
