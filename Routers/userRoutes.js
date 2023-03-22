const express = require("express");
const {login} = require("../Controller/login");

const router  = express.Router();

router.route("/login").post(login);

// router.route("/me").get(isAuthenticatedUser, getUserDetails);

module.exports = router;