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

// get specific question to load question view
app.get("/questions/:id", function(req, res) {
    db.questions.findOne({ where: { id: req.params.id } }).then(function(
        questionView
    ) {
        res.render("question-view", {
            question: questionView,
        });
    });

    db.responses.findAll({}).then(result => {
        res.render("question-view", {
            responses: result
        });
    });

});

app.get("/responses/:id", function(req, res) {
    db.responses.findOne({ where: { id: req.params.id } }).then(function(
        responseView
    ) {
        res.render("response-view", {
            response: responseView
        });
    });
});
});

// Render 404 page for any unmatched routes
app.get("*", function(req, res) {
    res.render("404");
});
};