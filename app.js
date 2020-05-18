const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();


// const url = "mongo";


app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout : 'home'}));
app.set('view engine', 'handlebars');

// Loading routes for external 
const home = require('./routes/home/index');
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');



// Loading routes for external 
app.use('/' , home);
app.use('/admin' , admin);
app.use('/admin/posts' , posts);


 


const port  = 4500 || process.env.PORT ;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

