// let models = require("./");

module.exports = function(sequelize, DataTypes) {
    var Responses = sequelize.define("responses", {
        responseId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        responseText: DataTypes.STRING
    });
    // Responses.belongsTo(models.employees);
    // Responses.belongsTo(models.questions);
    return Responses;
};

// responseId int NOT NULL AUTO_INCREMENT,
// 	employeeName varchar(255) NOT NULL,
//     questionId int NOT NULL,