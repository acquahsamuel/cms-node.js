const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");

router.all("/*", (req, res, next) => {
    req.app.locals.layout = "admin";
    next();
});

router.get('/', (req, res) => {
    // Attach lean() method to solve the issue
    Post.find({}).lean().then(posts => {

        res.render('admin/posts', {
            posts: posts
        });
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
            console.log("Error" + error);
        });
});

module.exports = router;