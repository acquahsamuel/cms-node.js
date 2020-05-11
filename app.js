const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
 
const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout : 'home'}));
app.set('view engine', 'handlebars');



app.get('/' , (req, res) =>{
    res.render('home/index');
});


app.get('/about' , (req, res) =>{
    res.render('home/index');
});


app.listen(4550, ()=>{
    console.log(`Listening on port 4550`);
})

// const port  = process.env.PORT = 4080;
// app.listen(`Listening on port ${port}`);