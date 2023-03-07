const asycHandler = require("express-async-handler");
const sharp = require("sharp");

const db = require("../db/conn");
const Image = db.Image;





// const cloudinary = require('../helper/imageUpload');
const uploadProfile = asycHandler(async (req, res) => {
  console.log("hello");
  const profilebuffer = req.file.buffer;
     const profileinfo= await sharp(profilebuffer).metadata();
     console.log(profileinfo);
  res.send("ok");
});


module.exports = uploadProfile;