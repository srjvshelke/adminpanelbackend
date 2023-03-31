const express = require("express");
const { posttotredis } = require("../Controller/postorder");
const router = express.Router();

router.route("/redis/postalldata").post(posttotredis);

module.exports = router;