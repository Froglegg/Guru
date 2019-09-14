var db = require("../models");

module.exports = function(app) {
  // Get all response
  app.get("/api/response", function(req, res) {
    db.Response.findAll({}).then(function(dbResponse) {
      res.json(dbResponse);
    });
  });

  // Create a new response
  app.post("/api/response", function(req, res) {
    db.Response.create(req.body).then(function(dbResponse) {
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