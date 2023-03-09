const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const db = require("../db/conn");
const Adduser = db.Adduser;

// Get All Product
exports.adduser = catchAsyncErrors(async (req, res, next) => {
  const { firstname, lastname, employeeid, emailid, contact, type, password, confirmpassword } = req.body;
  // if (!firstname || !lastname || !employeeid || !emailid || !contact || !type || !confirmpassword || !password) {
  //   return next(new ErrorHander("Field is empty", 404));
  // }
  // const userexist = await AddUser.findOne({ where: { emailid: emailid } });
  // if (userexist) {
  //   res.status(404);
  //   throw new Error("user already exists");
  // }
  // let hashpassword = await bcrypt.hash(password, 8);
  const userdata = await Adduser.create({
    firstname: firstname,
    lastname: lastname,
    employeeid: employeeid,
    emailid: emailid,
    contact: contact,
    type: type,
    password: password,
    confirmpassword: confirmpassword
  })
  if (userdata) {
    res.status(201).send({ firstname, lastname, employeeid, emailid, contact, type, password, confirmpassword });
  } else {
    return next(new ErrorHander("failed to create user", 404));
  }
});
exports.getAllUsers = async (req, res, next) => {
  const userdata = await AddUser.findAll();
  if (userdata) {
    res.status(201).send(userdata);
  } else {
    return next(new ErrorHander("failed to fetch user", 404));
  }

};