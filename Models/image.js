
module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("Image", {
     
        avtar: {
            type: DataTypes.STRING,
        },
        
    },{
        timestamps: true,
    });
    return Image;
}