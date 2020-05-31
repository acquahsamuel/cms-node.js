const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const Category = require("../../models/Category");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");

router.all("/*", (req, res, next) => {
  req.app.locals.layout = "home";
  next();
});

router.get("/", (req, res) => {
  Post.find({})
    .lean()
    .then(posts => {
      Category.find({})
        .lean()
        .then(categories => {
          res.render("home/index", {
            posts: posts,
            categories: categories
          });
        });
    });
});

router.get("/about", (req, res) => {
  res.render("home/about");
});

router.get("/login", (req, res) => {
  res.render("home/login");
});

router.post("/login", (req, res) => {
  res.send("home/login");
});




router.get("/register", (req, res) => {
  res.render("home/register");
});

router.post("/register", (req, res) => {
  let errors = [];

  if (!req.body.firstName) {
    errors.push({ message: "firstname field is required " });
  }

  if (!req.body.lastName) {
    errors.push({ message: "lastname field is required " });
  }

  if (!req.body.email) {
    errors.push({ message: "Email field is required " });
  }

  if (!req.body.password) {
    errors.push({ message: "Password field is required " });
  }

  if (!req.body.passwordConfirm) {
    errors.push({ message: "Password field is required " });
  }

  if (req.body.password !== req.body.passwordConfirm) {
    errors.push({ message: "Password  field does not match " });
  }

  if (errors.length > 0) {
    res.render("home/register", {
      errors: errors,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    });
  } else {
    User.findOne({ email: req.body.email }).then(user => {
      // If User is found
      if (!user) {
        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save(savedUser => {
              req.flash(
                "success_message",
                "Registration Successfull Please login "
              );
              res.redirect("/login");
            });
          });
        });
      } else {
        req.flash("error_message", "Email already Exists");
        res.redirect("/login");
      }
    });
  }
});

router.get("/post/:_id", (req, res) => {
  Post.findOne({ _id: req.params._id })
    .lean()
    .then(post => {
      Category.find({})
        .lean()
        .then(categories => {
          res.render("home/post", { post: post, categories: categories });
        });
    });
});

module.exports = router;
