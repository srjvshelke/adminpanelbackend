const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const db = require("../db/conn");
const client = require("../redis");
const Addworkorder = db.Addworkorder;


// Get All Product
exports.addWorkorder = catchAsyncErrors(async (req, res, next) => {
  let File = (req.files.File[0]) ? req.files.File[0].originalname : null;
    const {WorkorderID,Title,AssignTo} = req.body;

    const resss = await client.sAdd('d1',['a','b']);
    let ele = await client.sPop("d1")
    console.log(ele);
    // if (!WorkorderID || !Title || !AssignTo|| !File) {
    //   return next(new ErrorHander("Field is empty", 404));
    // }
    // const workorderIDexist = await Addworkorder.findOne({ where: { WorkorderID:WorkorderID  } });
    // if (workorderIDexist) {
    //   return next(new ErrorHander("WorkorderID already exists", 404));
    // }
    // const Workorderdata = await Addworkorder.create({
    //   WorkorderID: WorkorderID,
    //   Title: Title,
    //   AssignTo: AssignTo,
    //   File:File
    // })
    // if (Workorderdata) {
      res.status(201).json({ WorkorderID,Title,AssignTo,File});
    // } else {
      // return next(new ErrorHander("failed to create user", 404));
    // }
    
  });
  
  
  exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const  userdata = await Addworkorder.findAll();
    if (userdata) {
      // return next(new ErrorHander("failed to fetch user", 404));
        res.status(201).send(userdata);
    } else {
      return next(new ErrorHander("failed to fetch user", 404));
    }
  
  });