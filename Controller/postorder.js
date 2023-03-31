const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const db = require("../db/conn");
const client = require("../redis");
const Addworkorder = db.Addworkorder;
const jwt = require("jsonwebtoken");
const { json } = require("express");

exports.posttotredis = catchAsyncErrors(async (logindetails) => {
 
const workorderdata = getallWorkorderdata();



  await client.hSet(String(decodedData.id),'workOrderData',JSON.stringify(wordorderdata))

  // await hSet(decodedData.id,'personal',JSON.stringify(personal))

//   for (const key in personal) {
//     await client.hSet(decodedData.id,key,wordorderdata[key])
//  }
//  const redisres = await client.("Workorderdata", 'Workorderdata', JSON.stringify(wordorderdata));
  const result = await client.hGetAll(String(decodedData.id));

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
  });
  if (Workorderdata) {
   
    res.status(201).json({ WorkorderID, Title, AssignTo, File });
  } else {
    return next(new ErrorHander("failed to create user", 404));
  }

});




exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const userdata = await Addworkorder.findAll();
  if (userdata) {
    // return next(new ErrorHander("failed to fetch user", 404));
    res.status(201).send(userdata);
  } else {
    return next(new ErrorHander("failed to fetch user", 404));
  }

});