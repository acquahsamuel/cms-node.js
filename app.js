const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const {select} = require('./helpers/handlebars-helpers');


mongoose.Promise = global.Promise;

const url = "mongodb://localhost:27017/cms";

mongoose.connect(url, {
  // useMongoClient: true
  useUnifiedTopology: true,
  useNewUrlParser: true
});
mongoose.connection
  .once("open", () => console.log("Connected"))
  .on("error", err => {
    console.log(`Could not connect to database`, err);
  });



/* BodyParser */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));



app.use(express.static(path.join(__dirname, "public")));
app.engine("handlebars", exphbs({ defaultLayout: "home", helpers : {select: select}}));
app.set("view engine", "handlebars");

/* Loading routes for external */
const home = require("./routes/home/index");
const admin = require("./routes/admin/index");
const posts = require("./routes/admin/posts");



/* Loading routes for external */
app.use("/", home);
app.use("/admin", admin);
app.use("/admin/posts", posts);

const port = 4500 || process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

