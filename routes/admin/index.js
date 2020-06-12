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

    Post.count().exec(),
    Comment.count().exec(),
    Category.count().exec(),
    User.count().exec(),

  ];

  Promise.all(promise).then(([postCount, commentCount, categoryCount, userCount]) =>{
    res.render("admin/index", {
      postCount: postCount,
      commentCount : commentCount,
      userCount : userCount,
      categoryCount : categoryCount
    });
  }).catch(err =>{
    console.log(' Something happended Oops' + err);
  });




  /* Post.count({}).then(postCount => {
    Comment.count({}).then(postComment => {
      User.count({}).then(postUsers => {
        res.render("admin/index", {
          postCount: postCount,
          postComment: postComment,
          postUsers: postUsers
        });
      });
    }); 
   }); 
   */


});

// router.post("/generate-fake-posts", (req, res) => {
//   //res.send('It works');

//   for (let i = 0; i < req.body.amount; i++) {
//     let post = new Post();

//     post.title = faker.name.title();
//     post.status = "public";
//     post.allowComments = faker.random.boolean();
//     post.body = faker.lorem.sentence();

//     post.save().then(function (err) {
//       if (err) throw err;
//     });
//   }
//   res.redirect("/admin/posts");
// });

module.exports = router;

