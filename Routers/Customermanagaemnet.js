const express = require("express");
const { getcustomerdata } = require("../Controller/Addworkorder");
const router = express.Router();

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../Uploads/workorderfiles/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});
const upload = multer({ storage: storage });
router.route("/customermanagement/customer").get(getcustomerdata);

module.exports = router;