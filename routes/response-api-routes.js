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

    // update response, work in progress

    app.put("/api/responses/:id", function(req, res, next) {
        db.responses.update({
            responseText: req.body.responseText
        }, {
            where: {
                id: req.params.id
            },
            returning: true
        }).then(result => {
            console.log(`looks like it's catching! result is ${result}`);
            res.json(result);
        }).next(err => {
            console.log(`you got an error! message: ${err.message}`)
        });
    });


    // Delete a response by id
    app.delete("/api/responses/:id", function(req, res) {
        db.responses.destroy({ where: { id: req.params.id } }).then(function(
            dbResponse
        ) {
            res.json(dbResponse);
        });
    });

};