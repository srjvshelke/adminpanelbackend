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


  // const user = await Adduser.findByPk(id);
  const userdata = await Adduser.findAll();
  const workorderdata = await Addworkorder.findAll();
  if (userdata.length > 0) {
    for(let i = 0;i<userdata.length;i++){
      await client.hSet("userdata",String(userdata[i].ID), JSON.stringify(userdata[i].dataValues));
    }
   
  }
  if (workorderdata.length > 0) {
    for(let i = 0;i<userdata.length;i++){
    await client.hSet('workOrderData',String(workorderdata[i].ID), JSON.stringify(workorderdata[i].dataValues));
  }}
  // client.hGet(String(logindetails.ID),userdata.)
  // const result3 = await client.hGetAll('userdata');
  // const result = await client.hGet("userdata","3");
  // const result1 = await client.hGetAll('workOrderData');
  // console.log(result);
  // console.log(result1);
  // const userorderdata = [];
  // for(let i = 0;i<result.length;i++){
  //   userorderdata.push(JSON.parse(result[i]));
  // }
// console.log(userorderdata);
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