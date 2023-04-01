const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const db = require("../db/conn");
const client = require("../redis");
const Addworkorder = db.Addworkorder;
const Adduser = db.Addusers;
const jwt = require("jsonwebtoken");
const { json } = require("express");
const { parse } = require("dotenv");

exports.posttotredis = catchAsyncErrors(async (logindetails) => {

  const userdata = await Adduser.findAll();
  const workorderdata = await Addworkorder.findAll();
  if (userdata.length > 0) {
    await client.hSet(String(logindetails.ID), 'userdata', JSON.stringify(userdata[0].dataValues));
  }
  if (workorderdata.length > 0) {
    await client.hSet(String(logindetails.ID), 'workOrderData', JSON.stringify(workorderdata[0].dataValues));
  }
  client.hGet(tring(logindetails.ID),userdata.)
  const result = await client.hGetAll(String(logindetails.ID));
console.log(JSON.parse(result.userdata));
  return "ok";

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