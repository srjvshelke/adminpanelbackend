
module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define("CustomerManagement", {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        CONTRACTACCOUNT: {
            type: DataTypes.STRING,
            allowNull: false
        },
        BUSINESSPARTNER: {
            type: DataTypes.STRING,
            allowNull: false
        },
        MOVEINDATE: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CREATIONDATE: {
            type: DataTypes.STRING,
            allowNull: false
        },
        NAME: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ADDRESSNO: {
            type: DataTypes.STRING,
            allowNull: false
        },
        BLDGNAME: {
            type: DataTypes.STRING,
            allowNull: false
        },
        SOCIETYNAME: {
            type: DataTypes.STRING,
            allowNull: false
        },
        FLATNO: {
            type: DataTypes.STRING,
            allowNull: false
        },
        FLOOR: {
            type: DataTypes.STRING,
            allowNull: false
        },
        WING: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PLOTNo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ROADNAME: {
            type: DataTypes.STRING,
            allowNull: false
        },
        LANDMARK: {
            type: DataTypes.STRING,
            allowNull: false
        },
        COLONY: {
            type: DataTypes.STRING,
            allowNull: false
        },
        LOCATION: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CITY: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DISTRICT: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PINCODE: {
            type: DataTypes.STRING,
            allowNull: false
        },
        TELNUMBER1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        MOB_NUMBER: {
            type: DataTypes.STRING,
            allowNull: false
        },
        eMAIL: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        DRSNO: {
            type: DataTypes.STRING,
            allowNull: false
        },
        SEARCH1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CONNECTONOBJECT: {
            type: DataTypes.STRING,
            allowNull: false
        },
        KEY: {
            type: DataTypes.STRING,
            allowNull: false
        },
        FUNCTIONALLOCATION: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PLANTNAME: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PLANTLOCATIO: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PLANTSECTION: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PORTION: {
            type: DataTypes.STRING,
            allowNull: false
        }



    });
    return Customer;
}
