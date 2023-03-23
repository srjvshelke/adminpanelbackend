const express = require("express");
const { login, getUserDetails } = require("../Controller/login");
const {isAuthenticatedUser}  = require("../utils/JWT/auth");

const router = express.Router();

router.route("/login").post(login);
router.route("/me").get(isAuthenticatedUser,getUserDetails);

module.exports = router;