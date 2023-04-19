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



// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await Adduser.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = Adduser.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await Adduser.findOne({ where: { ID: req.params.id } });

  res.status(200).json({
    success: true,
    user,
  });
});

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const userexist = await Adduser.findOne({ where: { ID: req.params.id } });


  if (!userexist) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});


// update User Role -- Admin
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  let File = (req.files.Profile[0]) ? req.files.Profile[0].originalname : null;
  const { firstname, lastname, employeeid, emailid, contact, type, password, confirmpassword } = req.body;
  let hashpassword = await bcrypt.hash(password, 8);
  const newUserData = {
    firstname: firstname,
    lastname: lastname,
    employeeid: employeeid,
    emailid: emailid,
    contact: contact,
    type: type,
    password: hashpassword,
    confirmpassword: hashpassword,
    Profile:File
  };
await Adduser.update(newUserData, {
  where: {
    ID: req.params.id
  }
});
  res.status(200).json({
    success: true,
  });
});


// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user  = await Adduser.findByPk(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  // const imageId = user.avatar.public_id;

  // await cloudinary.v2.uploader.destroy(imageId);

// Delete everyone named "Jane"
await user.destroy(
  // where: {
  //   firstName: "Jane"
  // }
);

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
