const express = require("express");
const faker = require("faker");
const router = express.Router();
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const User = require("../../models/User");
const Categories = require("../../models/Category");
const { userAuthenticated } = require("../../helpers/authentication");
const Category = require("../../models/Category");

router.all("/*", userAuthenticated, (req, res, next) => {
  req.app.locals.layout = "admin";
  next();
});

router.get("/", (req, res) => {
  Post.count({}).then(postCount => {
    Comment.count({}).then(postComment => {
      User.count({}).then(postUsers => {
        Category.countDocuments({}).then(postCategory =>{
        res.render("admin/index", {
          postCount: postCount,
          postComment: postComment,
          postUsers: postUsers,
          postCategory : postCategory
        });
      });
    })
    });
  });
});

module.exports = router;

