const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const client = require("../redis");
const bcrypt = require("bcryptjs");
const db = require("../db/conn");
const Adduser = db.Addusers;

// Get All Product
exports.adduser = catchAsyncErrors(async (req, res, next) => {
  let File = (req.files.Profile[0]) ? req.files.Profile[0].originalname : null;
  const { firstname, lastname, employeeid, emailid, contact, type, password, confirmpassword } = req.body;
  if (!firstname || !lastname || !employeeid || !emailid || !contact || !type || !confirmpassword || !password) {
    return next(new ErrorHander("Field is empty", 404));
  }
  const userexist = await Adduser.findOne({ where: { emailid: emailid } });
  if (userexist) {
    return next(new ErrorHander("user already exists", 404));
  }
  let hashpassword = await bcrypt.hash(password, 8);
  const userdata = await Adduser.create({
    firstname: firstname,
    lastname: lastname,
    employeeid: employeeid,
    emailid: emailid,
    contact: contact,
    type: type,
    password: hashpassword,
    confirmpassword: hashpassword,
    Profile:File
  })
  if (userdata) {
    res.status(201).send({ firstname, lastname, employeeid, emailid, contact, type, password, confirmpassword,File });

    await client.hSet(String(userdata.ID), 'userdata', JSON.stringify(userdata[0].dataValues));
  } else {
    return next(new ErrorHander("failed to create user", 404));
  }
});


exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const userdata = await Adduser.findAll();
  if (userdata) {
    // return next(new ErrorHander("failed to fetch user", 404));
    res.status(201).send(userdata);
  } else {
    return next(new ErrorHander("failed to fetch user", 404));
  }

});