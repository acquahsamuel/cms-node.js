const express = require('express');
const faker = require('faker');
const router = express.Router();
const Post = require('../../models/Post');

router.all('/*', (req , res , next)=>{
    req.app.locals.layout = 'admin';
    next();
});


router.get('/', (req, res) => {
    res.render('admin/index');
});


router.post('/generate-fake-posts', (req, res)=>{
     //res.send('It works');

     for(let i = 0; i < req.body.amount; i++){
       let post = new Post();

       post.title = faker.name.title();
       post.status = 'public'
       post.allowComments = faker.random.boolean();
       post.body  =  faker.lorem.sentence();

       post.save().then(function(err){
           if(err) throw err;
       });
    }
       res.redirect('/admin/posts')
    
});


module.exports = router;




