const express = require("express");
const login = require("../Controller/login");
const registerUser = require("../Controller/registerUser");
const uploadProfile = require("../Controller/uploadimage");
const router  = express.Router();
const multer = require('multer');
const sharp = require("sharp");


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router;