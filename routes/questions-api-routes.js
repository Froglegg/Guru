var db = require("../models");

module.exports = function(app) {

    // Create a new question
    app.post("/api/questions", function(req, res) {
        console.log("running app.post to questions");
        db.questions.create(req.body).then(function(dbquestions) {
            res.json(dbquestions);
        });
    });

    // Get all questions
    app.get("/api/questions", function(req, res) {
        db.questions.findAll({}).then(function(dbquestions) {
            res.json(dbquestions);
        });
    });

    // Get one question
    app.get("/api/questions/:id", function(req, res) {
        db.questions.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(dbquestion) {
            res.json(dbquestion);
        });
    });

    // update feature, work in progress
    app.put("/api/questions/:id", function(req, res, next) {
        db.questions.update({
            employeeName: req.body.employeeName,
            subject: req.body.subject,
            body: req.body.body,
            status: req.body.status
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

    // Delete a question by id
    app.delete("/api/questions/:id", function(req, res) {
        db.questions
            .destroy({ where: { id: req.params.id } })
            .then(function(dbquestions) {
                res.json(dbquestions);
            });
    });

};