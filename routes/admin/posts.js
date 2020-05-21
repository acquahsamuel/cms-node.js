<<<<<<< HEAD
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


=======
const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");

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
      res.render("admin/posts", { posts: posts });
    })
    .catch(error => {
      console.log("There was something wrong" + error);
    });
});

router.get("/create", (req, res) => {
  res.render("admin/posts/create");
});

router.post("/create", (req, res) => {
  /* Handling allow comment */
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
    body: req.body.body
  });

  newPost
    .save()
    .then(savedPost => {
      console.log(savedPost);
      res.redirect("/admin/posts");
    })
    .catch(error => {
      console.log("Could not save post " + error);
    });
});

router.get("/edit/:_id", (req, res) => {
  Post.findOne({ _id: req.params._id })
    .lean()
    .then(post => {
      res.render("admin/posts/edit", { post: post });
    });
});

router.put("/edit/:_id", (req, res) => {
  Post.findOne({ _id: req.params._id }).then(post => {
    if (req.body.allowComments) {
      allowComments = true;
    } else {
      allowComments = false;
    }

    post.title = req.body.title;
    post.status = req.body.status;
    post.allowComments = allowComments;
    post.body = req.body.body;

    post.save().then(updatedPost => {
      res.redirect("/admin/posts");
    });
  });
});

router.delete("/:_id", (req, res) => {
  Post.remove({ _id: req.params._id }).then(result => {
    res.redirect("/admin/posts");
  });
});

module.exports = router;
>>>>>>> 988d8aa94c58ef23d72150d5d1c2f3102366dd56
