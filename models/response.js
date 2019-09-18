module.exports = function(sequelize, DataTypes) {
  var Responses = sequelize.define("responses", {
    employeeName: DataTypes.STRING,
    body: DataTypes.TEXT,
  });
  Responses.associate = function(models) {
    Responses.belongsTo(models.questions, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Responses;
};

// responseId int NOT NULL AUTO_INCREMENT,
// 	employeeName varchar(255) NOT NULL,
//     questionId int NOT NULL,
