const express = require("express");
const { getAllUsers, adduser } = require("../Controller/AddUserController");
const router  = express.Router();

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../Uploads/Profile/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
const upload = multer({ storage: storage });

router.route("/users/addnew").post(upload.fields([{ name: 'Profile', maxCount: 1 }]),adduser);
router.route("/users/getallusers").get(getAllUsers);



module.exports = router;