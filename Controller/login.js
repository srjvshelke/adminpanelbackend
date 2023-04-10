
const express = require('express');
const app = express();
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const db = require("../db/conn");
const User = db.Addusers;
const bcrypt = require("bcryptjs");
app.use(express.json());
const client = require("../redis");
// const jwt = require("jsonwebtoken");
const { createTokens } = require("../utils/JWT/jwt");
const sendToken = require('../utils/JWT/jwt');
const { posttotredis } = require('./postorder');


exports.login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHander("Please Enter Email & Password", 400));
    }
    const loginexist = await User.findOne({ where: { emailid: email } });
    if (!loginexist) {
        return next(new ErrorHander("Invalid email or password", 401));
    }
    //pushing to redis
   
    //
    const dbpassword = loginexist.password;
    bcrypt.compare(password, dbpassword).then((match) => {
        if (!match) {
            return next(new ErrorHander("Invalid email or password", 401));
        }
    });
    await posttotredis(loginexist);
    sendToken(loginexist, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {

    let id = req.user.ID;
   var presentinredis =  await client.hExists('userdata',String(id)) ;
   var user;
   if(presentinredis){
    user = await client.hGet("userdata",String(id));
    user = JSON.parse(user);
   }else{
    user = await User.findByPk(id);
   }
    // const 

    res.status(200).json({
        success: true,
        user,
    });
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
//redis clearing data 
await client.flushAll();
//
    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});