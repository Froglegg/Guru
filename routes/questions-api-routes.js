var db = require("../models");

module.exports = function(app) {
  // Get all question
  app.get("/api/questions", function(req, res) {
    db.questions.findAll({}).then(function(dbquestions) {
      res.json(dbquestions);
    });
  });

  // Create a new question
  app.post("/api/questions", function(req, res) {
    db.questions.create(req.body).then(function(dbquestions) {
      res.json(dbquestions);
    });
  });

  // Delete an questions by id
  app.delete("/api/questions/:id", function(req, res) {
    db.questions
      .destroy({ where: { id: req.params.id } })
      .then(function(dbquestions) {
        res.json(dbquestions);
      });
  });
};
