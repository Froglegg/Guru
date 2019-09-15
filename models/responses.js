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