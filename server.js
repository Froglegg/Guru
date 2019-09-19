require("dotenv").config();
var path = require("path");

var session = require("express-session");
var passport = require("./config/passport");
var bodyParser = require("body-parser");

var express = require("express");

var PORT = process.env.PORT || 4500;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(path.join(__dirname, "/public")));

// Parse application body as JSON
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());

app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
var exphbs = require("express-handlebars");
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/response-api-routes")(app);
require("./routes/questions-api-routes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/user-api-routes.js")(app);

var syncOptions = {
  force: false
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

var db = require("./models");

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
