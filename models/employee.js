module.exports = function(sequelize, DataTypes) {
  var Employees = sequelize.define("employees", {
    name: DataTypes.STRING,
    salary: DataTypes.STRING,
    benefits: DataTypes.TEXT,
    benefitsId: DataTypes.INTEGER
  });
  return Employees;
};

// id int NOT NULL AUTO_INCREMENT,
//     name varchar(255) NOT NULL UNIQUE,
// 	salary varchar(255) NOT NULL,
// 	benefits int NOT NULL,
//     benefitsId int NOT NULL,
//     PRIMARY KEY (id)