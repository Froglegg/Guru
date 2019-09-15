module.exports = function(sequelize, DataTypes) {
  var Employees = sequelize.define("employees", {
    name: DataTypes.STRING,
    salary: DataTypes.STRING,
    benefits: DataTypes.TEXT,
    benefitsId: DataTypes.INTEGER
  });
  return Employees;
};
