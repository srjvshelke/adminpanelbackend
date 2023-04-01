const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const db = require("../db/conn");
const client = require("../redis");
const Addworkorder = db.Addworkorder;
const jwt = require("jsonwebtoken");
const { json } = require("express");
// Get All Product
exports.addWorkorder = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  const decodedData = await jwt.verify(token, process.env.JWTPIN);
  console.log(decodedData.id);
  let File = (req.files.File[0]) ? req.files.File[0].originalname : null;
  const { WorkorderID, Title, AssignTo } = req.body;
  const wordorderdata = {
    WorkorderID: WorkorderID,
    Title: Title,
    AssignTo: AssignTo,
    File: File
  }





  // await hSet(decodedData.id,'personal',JSON.stringify(personal))

  //   for (const key in personal) {
  //     await client.hSet(decodedData.id,key,wordorderdata[key])
  //  }
  //  const redisres = await client.("Workorderdata", 'Workorderdata', JSON.stringify(wordorderdata));
  
  console.log(JSON.parse(result));
  if (!WorkorderID || !Title || !AssignTo || !File) {
    return next(new ErrorHander("Field is empty", 404));
  }
  const workorderIDexist = await Addworkorder.findOne({ where: { WorkorderID: WorkorderID } });
  if (workorderIDexist) {
    return next(new ErrorHander("WorkorderID already exists", 404));
  }
  const Workorderdata = await Addworkorder.create({
    WorkorderID: WorkorderID,
    Title: Title,
    AssignTo: AssignTo,
    File: File
  })
  if (Workorderdata) {
    await client.hSet(String(decodedData.id), 'workOrderData', JSON.stringify(wordorderdata))
    res.status(201).json({ WorkorderID, Title, AssignTo, File });
    
  } else {
    return next(new ErrorHander("failed to create user", 404));
  }

});




exports.getallWorkorderdata = catchAsyncErrors(async (req, res, next) => {
  const workorderdata = await Addworkorder.findAll();
  if (workorderdata) {
    // return next(new ErrorHander("failed to fetch user", 404));
    res.status(201).send(workorderdata);
  } else {
    return next(new ErrorHander("failed to fetchworkorderdata", 404));
  }

});