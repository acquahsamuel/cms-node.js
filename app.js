const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout : 'home'}));
app.set('view engine', 'handlebars');


app.get('/' , (req, res) =>{
    res.render('home/index');
});


app.get('/about' , (req, res) =>{
    res.render('home/about');
});



app.listen(4218, () => {
    console.log(`Listening on port 4218`);
  });




