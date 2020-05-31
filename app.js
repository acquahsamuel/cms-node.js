const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const upload = require("express-fileupload");
const session = require("express-session");
const flash = require("connect-flash");
const { mongoDbUrl } = require("./config/database");
const { select, generateDate } = require("./helpers/handlebars-helpers");

mongoose.Promise = global.Promise;

mongoose.connect(mongoDbUrl, {
  // useMongoClient: true
  useUnifiedTopology: true,
  useNewUrlParser: true
});
mongoose.connection
  .once("open", () => console.log("Connected"))
  .on("error", err => {
    console.log(`Could not connect to database`, err);
  });

// Sessions
app.use(
  session({
    secret: "edwindiaz123ilovecoding",
    resave: true,
    saveUninitialized: true
  })
);

// Displaying errors Local variables using middlewares
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_message = req.flash("success_message");
  res.locals.error_message = req.flash("error_message");
  next();
});

/* BodyParser */
app.use(upload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "home",
    helpers: { select: select, generateDate: generateDate }
  })
);
app.set("view engine", "handlebars");

/* Loading routes for external */
const home = require("./routes/home/index");
const admin = require("./routes/admin/index");
const posts = require("./routes/admin/posts");
const categories = require("./routes/admin/categories");
const comments = require("./routes/admin/comments");

/* Loading routes for external */
app.use("/", home);
app.use("/admin", admin);
app.use("/admin/posts", posts);
app.use("/admin/categories", categories);
app.use("/admin/comments", comments);

const port = 4500 || process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
