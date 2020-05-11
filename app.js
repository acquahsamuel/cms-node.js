const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout : 'home'}));
app.set('view engine', 'handlebars');

// Loading routes for external 
const home = require('./routes/home/index');
const admin = require('./routes/admin/index');

// Loading routes for external 
app.use('/' , home);
app.use('/admin' , admin);






app.listen(4218, () => {
    console.log(`Listening on port 4218`);
  });

