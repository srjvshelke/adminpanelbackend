const express = require("express");
const login = require("../Controller/login");
const registerUser = require("../Controller/registerUser");
const uploadProfile = require("../Controller/uploadimage");
const router  = express.Router();
const multer = require('multer');
const sharp = require("sharp");


router.route("/register").post(registerUser);
router.route("/").post(login);


///


const storage = multer.memoryStorage({
  // destination:(req,file,cb) => {
  //     console.log('scsc');
  //     cb(null, __dirname+'/../profile-images')
  // },
  // filename:(req,file,cb) => {
  //     // let userToken = jwt.decode( req.cookies.userData );//
  //     let extention = file.mimetype.split('/')[1];
  //     cb(null,`${extention}`)
  // }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb('invalid image file!', false);
    }
  };
  const uploads = multer({ storage, fileFilter });
  
router.route("/upload-profile").post(uploads.single('profile'),uploadProfile);



module.exports = router;