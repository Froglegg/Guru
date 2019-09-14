module.exports = function(sequelize, DataTypes) {
  var Responses = sequelize.define("responses", {
    responseId: DataTypes.INTEGER,
    employeeName: DataTypes.STRING,
    questionID: DataTypes.INTEGER,
  });
  return Responses;
};

// responseId int NOT NULL AUTO_INCREMENT,
// 	employeeName varchar(255) NOT NULL,
//     questionId int NOT NULL,