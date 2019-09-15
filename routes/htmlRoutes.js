// var path = require("path");
var db = require("../models");

module.exports = function(app) {
    // Load index page
    app.get("/", function(req, res) {
        db.questions.findAll({}).then(function(dbQuestions) {
            res.render("index", {
                msg: "Welcome!",
                style: ["normalize.css", "styles.css", "colors.css"],
                questions: dbQuestions
            });
        });
    });

    app.get("/questions/:id", function(req, res) {
        db.questions
            .findOne({ where: { id: req.params.id } })
            .then(function(dbQuestions) {
                db.responses
                    .findAll({ where: { questionId: req.params.id } })
                    .then(function(dbResponses) {
                        res.render("question-view", {
                            question: dbQuestions,
                            responses: dbResponses,
                            style: ["normalize.css", "styles.css", "colors.css"]
                        });
                    });
            });
    });

    app.get("/responses/:id", function(req, res) {
        db.responses.findOne({ where: { id: req.params.id } }).then(result => {
            res.render("response-view", {
                response: result
            });
        }).catch(err => {
            console.log(`error! ${err.message}`);
        });
    });

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
}