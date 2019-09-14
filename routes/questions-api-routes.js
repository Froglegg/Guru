var db = require("../models");

module.exports = function(app) {
  // Get all question
  app.get("/api/questions", function(req, res) {
    db.Questions.findAll({}).then(function(dbQuestions) {
      res.json(dbQuestions);
    });
  });

  // Create a new question
  app.post("/api/questions", function(req, res) {
    db.Questions.create(req.body).then(function(dbQuestions) {
      res.json(dbQuestions);
    });
  });

  // Delete an questions by id
  app.delete("/api/questions/:id", function(req, res) {
    db.Questions.destroy({ where: { id: req.params.id } }).then(function(
      dbQuestions
    ) {
      res.json(dbQuestions);
    });
  });
};
