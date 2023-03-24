
module.exports = (sequelize, DataTypes) => {
    const Addusers = sequelize.define("adduser", {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        employeeid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        emailid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contact: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        confirmpassword: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Profile: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            // allowNull: false,
            defaultValue: false,
        },

    });
    return Addusers;
}
