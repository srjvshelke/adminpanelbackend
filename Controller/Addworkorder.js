const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const db = require("../db/conn");
const Addworkorder = db.Addworkorder;


// Get All Product
exports.addWorkorder = catchAsyncErrors(async (req, res, next) => {
    const {WorkorderID,Title,AssignTo } = req.body;
    if (!WorkorderID || !Title || !AssignTo) {
      return next(new ErrorHander("Field is empty", 404));
    }
    const workorderIDexist = await Adduser.findOne({ where: { WorkorderID:WorkorderID  } });
    if (workorderIDexist) {
      return next(new ErrorHander("WorkorderID already exists", 404));
    }
    const Workorderdata = await Adduser.create({
      WorkorderID: WorkorderID,
      Title: Title,
      AssignTo: AssignTo,
    })
    if (Workorderdata) {
      res.status(201).send({ WorkorderID,Title,AssignTo});
    } else {
      return next(new ErrorHander("failed to create user", 404));
    }
    
  });
  
  
  exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const  userdata = await Adduser.findAll();
    if (userdata) {
      // return next(new ErrorHander("failed to fetch user", 404));
        res.status(201).send(userdata);
    } else {
      return next(new ErrorHander("failed to fetch user", 404));
    }
  
  });