const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");

router.get("/", (req, res) => {
  Comment.find({user : req.user.id})
    .lean()
    .populate("user")
    .then(comments => {
      res.render("admin/comments", {
        comments: comments
      });
    });
});

router.post("/", (req, res) => {
  Post.findOne({
      _id: req.body.id
    })
    .then(post => {
      /*  console.log(post); */
      const newComment = new Comment({
        user: req.user.id,
        body: req.body.body
      });
      post.comments.push(newComment);
      post.save().then(postSaved => {
        newComment.save().then(commentSaved => {
          res.redirect(`/post/${post.id}`);
        });
      });
    })
    .catch(err => {
      console.log("Error found" + err);
    });
});

router.delete("/:_id", (req, res) => {
  Comment.findOne({
    _id: req.params._id
  }).then(comment => {
      comment.remove();
      Post.findOneAndUpdate({comments : req.params.id}, {$pull : {comments : req.params.id}}, (err , data) =>{
        if(err) console.log(err);
        res.redirect("/admin/comments");
      })  
    });
});



module.exports = router;
