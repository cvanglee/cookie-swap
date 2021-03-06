// Require components
var express = require("express");
var session = require("express-session");
var passport = require("./config/passport");
const routes = require("./routes");
var db = require("./models");
var app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Use Passport
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/tcms.js")(app);
require("./routes/post.js")(app);
require("./routes/sum.js")(app);
require("./routes/login.js")(app);

// Add routes, both API and view
app.use(routes);

// Sync it
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function() {
    console.log("App now listening on port:", PORT);
  });
});