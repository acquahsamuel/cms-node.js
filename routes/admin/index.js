const express = require("express");
const faker = require("faker");
const router = express.Router();
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const User = require("../../models/User");
const Category = require("../../models/Category");

const { userAuthenticated } = require("../../helpers/authentication");

router.all("/*", userAuthenticated, (req, res, next) => {
  req.app.locals.layout = "admin";
  next();
});

router.get("/", (req, res) => {
  const promise = [
    Post.countDocuments().exec(),
    Comment.countDocuments().exec(),
    Category.countDocuments().exec(),
    User.countDocuments().exec(),
  ];

  Promise.all(promise)
    .then(([postCount, commentCount, categoryCount, userCount]) => {
      res.render("admin/index", {
        postCount: postCount,
        commentCount: commentCount,
        userCount: userCount,
        categoryCount: categoryCount,
      });
    })
    .catch((err) => {
      console.log(" Something happended Oops" + err);
    });
});

module.exports = router;
