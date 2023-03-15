
module.exports = (sequelize, DataTypes) => {
    const Addworkorder = sequelize.define("Addworkorder", {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        WorkorderID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        AssignTo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        File: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Addworkorder;
}
