// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var currentUserid;
//
module.exports = function(app) {
    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        currentUserid = req.user.id;
        // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
        // So we're sending the user back the route to the members page because the redirect will happen on the front end
        // They won't get this or even be able to access this page if they aren't authed
        res.json({
            userId: req.user.id
        });
    });
    //
    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/signup", function(req, res) {
        console.log(req.body);
        db.User.create({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
            })
            .then(function() {
                res.json({
                    userId: req.user.id
                });
            })
            .catch(function(err) {
                console.log(err);
                res.json(err);
                // res.status(422).json(err.errors[0].message);
            });
    });
    //
    //
    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function(req, res) {
        db.User.findAll({}).then(function(dbUser) {
            res.json(dbUser);
        });
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
              email: req.user.email,
              id: req.user.id,
              name: req.user.name
            });
        }
    });

    app.get("/api/user_data/:id", function(req, res) {
        db.User.findOne({ where: { id: req.params.id } }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

};