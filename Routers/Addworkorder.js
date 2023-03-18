const express = require("express");
const { addWorkorder } = require("../Controller/Addworkorder");
const router  = express.Router();

const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Uploads/workorderfiles/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +  file.originalame )
    }
  })
  const upload = multer({ storage:storage });
router.route("/workorder/addworkorder",upload.single('File')).post(addWorkorder);
// router.route("workorder/addworkorder").post(addWorkorder);

module.exports = router;