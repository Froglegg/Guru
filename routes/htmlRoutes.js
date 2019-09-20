var path = require("path");
var db = require("../models");

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/homepage");
    }
    res.render("login", {
      layout: "login",
      style: ["normalize.css", "bootstrap.min.css", "styles.css", "colors.css"],
      script: ["jquery.min.js", "bootstrap.min.js"]
    });
  });

  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/homepage");
    }
    res.render("signup", {
      layout: "login",
      style: ["normalize.css", "bootstrap.min.css", "styles.css", "colors.css"],
      script: ["jquery.min.js", "bootstrap.min.js"]
    });
  });

  // Load index page, fires on logout
  app.get("/homepage", isAuthenticated, function(req, res) {
    db.questions.findAll({}).then(function(dbQuestions) {
      res.render("index", {
        msg: "Welcome!",
        style: [
          "normalize.css",
          "bootstrap.min.css",
          "styles.css",
          "colors.css"
        ],
        script: ["jquery.min.js", "bootstrap.min.js"],
        questions: dbQuestions
      });
    });
  });
  
  app.get("/homepage:id", isAuthenticated, function(req, res) {
    db.User.findOne({ where: { id: req.params.id } }).then(function(dbUser) {
      db.questions.findAll({}).then(function(dbQuestions) {
        res.render("index", {
          loginUserId: dbUser.id,
          user: dbUser.name,
          questions: dbQuestions,
          style: [
            "normalize.css",
            "bootstrap.min.css",
            "styles.css",
            "colors.css"
          ],
          script: ["jquery.min.js", "bootstrap.min.js"]
        });
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
              username: req.user.name,
              questions: dbQuestions,
              responses: dbResponses,
              style: [
                "normalize.css",
                "bootstrap.min.css",
                "styles.css",
                "colors.css"
              ],
              script: ["jquery.min.js", "bootstrap.min.js"]
            });
          });
      });
  });

  // Render information page when you click on the guru
  app.get("/information", function(req, res) {
    res.render("information", {
      layout: "login",
      style: ["normalize.css", "bootstrap.min.css", "styles.css", "colors.css"],
      script: ["jquery.min.js", "bootstrap.min.js"]
    });
  });

      // Route for logging user out
      app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/homepage");
    });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
