
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const { isEmpty, uploadDir } = require("../../helpers/upload-helper");

const express = require('express');
const router = express.Router();


router.all('/*', (req , res , next)=>{
    req.app.locals.layout = 'admin';
    next();
});

 
router.get('/',(req, res)=>{
    res.send('/admin/posts/');
})


module.exports = router;



router.all("/*", (req, res, next) => {
  req.app.locals.layout = "admin";
  next();
});

router.get("/", (req, res) => {
  /*  Attach Post.find({}).lean().then(posts */
  /*  method to solve the issue */
  Post.find({})
    .lean()
    .then(posts => {
      res.render("admin/posts", {
        posts: posts
      });
    })
    .catch(error => {
      console.log("There was something wrong" + error);
    });
});

router.get("/create", (req, res) => {
  res.render("admin/posts/create");
});

router.post("/create", (req, res) => {
  let errors = [];

  if (!req.body.title) {
    errors.push({ message: "please add a title " });
  }

  if (!req.body.body) {
    errors.push({ message: "please add a description " });
  }

  if (errors.length > 0) {
    res.render("admin/posts/create", {
      errors: errors
    });
  } else {
    let filename = "";

    if (!isEmpty(req.files)) {
      let file = req.files.file;
      filename = Date.now() + "-" + file.name;

      file.mv("./public/uploads/" + filename, err => {
        if (err) throw err;
      });
    }

    let allowComments = true;
    if (req.body.allowComments) {
      allowComments = true;
    } else {
      allowComments = false;
    }

    const newPost = new Post({
      _id: req.body.id,
      title: req.body.title,
      status: req.body.status,
      allowComments: allowComments,
      body: req.body.body,
      file: filename
    });

    newPost
      .save()
      .then(savedPost => {
        req.flash(
          `success_message`,
          `Post ${savedPost.title} was created successfully`
        );
        res.redirect("/admin/posts");
      })
      .catch(error => {
        console.log("Could not save post " + error);
      });
  }
});

router.get("/edit/:_id", (req, res) => {
  Post.findOne({
    _id: req.params._id
  })
    .lean()
    .then(post => {
      res.render("admin/posts/edit", {
        post: post
      });
    });
});



router.put("/edit/:_id", (req, res) => {
  Post.findOne({
    _id: req.params._id
  }).then(post => {
    if (req.body.allowComments) {
      allowComments = true;
    } else {
      allowComments = false;
    }

    post.title = req.body.title;
    post.status = req.body.status;
    post.allowComments = allowComments;
    post.body = req.body.body;

    if (!isEmpty(req.files)) {
      let file = req.files.file;
      filename = Date.now() + "-" + file.name;
      post.file = filename;

      file.mv("./public/uploads/" + filename, err => {
        if (err) throw err;
      });
    }

    post.save().then(updatedPost => {
      req.flash(
        `success_message`,
        `Post ${updatedPost.title} was created successfully`
      );
      res.redirect("/admin/posts");
    });
  });
});

router.delete("/:_id", (req, res) => {
  Post.findOne({
    _id: req.params._id
  }).then(post => {
    fs.unlink(uploadDir + post.file, err => {
      post.remove();
      req.flash(`error_message`, `Post delete was created successfully`);
      res.redirect("/admin/posts");
    });
  });
});

module.exports = router;
