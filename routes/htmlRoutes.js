var path = require("path");
var db = require("../models");

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/homepage");
    }
    res.render("login", {
      style: ["normalize.css","bootstrap.min.css", "styles.css", "colors.css"],
      script: ["jquery.min.js", "bootstrap.min.js"]
    });
  });
  
  app.get("/signup", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/homepage");
    }
    res.render("signup", {
      style: ["normalize.css","bootstrap.min.css", "styles.css", "colors.css"],
      script: ["jquery.min.js", "bootstrap.min.js"]
    });
  });
  // Load index page
  app.get("/homepage", isAuthenticated, function(req, res) {
    db.questions.findAll({}).then(function(dbQuestions) {
      res.render("index", {
        msg: "Welcome!",
        style: ["normalize.css","bootstrap.min.css", "styles.css", "colors.css"],
        script: ["jquery.min.js", "bootstrap.min.js"],
        questions: dbQuestions
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/questions/:id", function(req, res) {
    db.questions
      .findOne({ where: { id: req.params.id } })
      .then(function(dbQuestions) {
        db.responses
          .findAll({ where: { questionId: req.params.id } })
          .then(function(dbResponses) {
            res.render("questions", {
              questions: dbQuestions,
              responses: dbResponses,
              style: ["normalize.css","bootstrap.min.css", "styles.css", "colors.css"],
              script: ["jquery.min.js", "bootstrap.min.js"]
            });
          });
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
