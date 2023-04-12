
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
        } , 
        PLOTNo: {
            type: DataTypes.STRING,
            allowNull: false
        }  ,
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
        },   COLONY: {
            type: DataTypes.STRING,
            allowNull: false
        } ,  FLATNO: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });
    return Customer;
}
