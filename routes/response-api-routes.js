var db = require("../models");

module.exports = function(app) {
    // Create a new response
    app.post("/api/responses", function(req, res) {
        db.responses.create(req.body).then(function(dbResponse) {
            res.json(dbResponse);
        });
    });

    // Get all responses
    app.get("/api/responses", function(req, res) {
        db.responses.findAll({}).then(function(dbResponse) {
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


    // Delete an response by id
    app.delete("/api/responses/:id", function(req, res) {
        db.responses.destroy({ where: { id: req.params.id } }).then(function(
            dbResponse
        ) {
            res.json(dbResponse);
        });
    });
};