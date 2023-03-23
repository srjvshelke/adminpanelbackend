const express = require("express");
const { login, getUserDetails } = require("../Controller/login");
const { validateToken } = require("../utils/JWT/jwt");

const router = express.Router();

router.route("/login").post(login);
router.route("/me").get(getUserDetails);

module.exports = router;