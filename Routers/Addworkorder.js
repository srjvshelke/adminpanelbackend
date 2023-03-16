const express = require("express");
const { addWorkorder } = require("../Controller/Addworkorder");
const router  = express.Router();

router.route("/workorder/addworkorder").post(addWorkorder);
// router.route("workorder/addworkorder").post(addWorkorder);

module.exports = router;