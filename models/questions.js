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
        Questions.hasMany(models.responses, {
            foreignKey: "questionId"
        });
    };

    return Questions;
};