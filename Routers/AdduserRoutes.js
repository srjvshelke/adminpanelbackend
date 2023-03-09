const express = require("express");
const { getAllUsers, adduser } = require("../Controller/AddUserController");
const router  = express.Router();

router.route("/users/addnew").post(adduser);
router.route("/users/getallusers").get(getAllUsers);



module.exports = router;