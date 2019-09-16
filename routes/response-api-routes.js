var db = require("../models");

module.exports = function(app) {
  // Get all response
  app.get("/api/response", function(req, res) {
    db.responses.findAll({}).then(function(dbResponse) {
      res.json(dbResponse);
    });
  });
  // Get all responses by Question id
  app.get("/questions/api/response/:id", function(req, res) {
    db.responses
      .findAll({ where: { questionId: req.params.id } })
      .then(function(dbResponse) {
        res.json(dbResponse);
      });
  });

  // Create a new response
  app.post("/questions/api/response", function(req, res) {
    db.responses.create(req.body).then(function(dbResponse) {
      res.json(dbResponse);
    });
  });

  // Delete an response by id
  app.delete("/api/response/:id", function(req, res) {
    db.Response.destroy({ where: { id: req.params.id } }).then(function(
      dbResponse
    ) {
      res.json(dbResponse);
    });
  });
};
