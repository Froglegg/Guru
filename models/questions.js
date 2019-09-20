let models = require("./");

module.exports = function(sequelize, DataTypes) {

    var Questions = sequelize.define("questions", {
        employeeName: DataTypes.STRING,
        subject: DataTypes.STRING,
        body: DataTypes.TEXT,
        status: {
            type: DataTypes.STRING,
            defaultValue: "Not started"
        },
        category: DataTypes.STRING
    });

    Questions.associate = function(models) {
        // Questions.belongsTo(models.users, {
        //     foreignKey: {
        //         allowNull: false
        //     }
        // });
        Questions.hasMany(models.responses, {
            foreignKey: "questionId"
        });
    };

    return Questions;
};



// FORMELY EXAMPLE.JS (MODEL)
//-----
// questionId int NOT NULL AUTO_INCREMENT,
//     employeeId int NOT NULL,
// 	employeeName varchar(255) NOT NULL,
// 	subject varchar(255) NOT NULL,
// 	body int NOT NULL,
// 	status int NOT NULL,
//     assignedTo varchar(255) NOT NULL,
