const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");


router.post("/", (req, res) => {
  Post.findOne({_id: req.body.id })
    .then(post => {
      /*  console.log(post); */
      const newComment = new Comment({
        user: req.user.id,
        body: req.body.body,
      })
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



module.exports = router;
