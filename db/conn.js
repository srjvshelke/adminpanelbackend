const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("adminpanel", "root","root", {
    host: "localhost",
    dialect: "mysql",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
);
sequelize.authenticate()
.then(() => {
    console.log('connected..');
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.AddUser = require("../Models/AddUser")(sequelize, DataTypes);


db.sequelize.sync({force:false}).then((result)=>{
    console.log("sync is done");
})
module.exports = db;