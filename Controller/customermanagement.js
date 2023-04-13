const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const db = require("../db/conn");
const client = require("../redis");
const Customer = db.Customer;
const jwt = require("jsonwebtoken");
const { json } = require("express");
// Get All Product
exports.getcustomerdata = catchAsyncErrors(async (req, res, next) => {
  const Customerdata = await Customer.findAll();
  if (Customerdata) {
    // return next(new ErrorHander("failed to fetch user", 404));
    res.status(201).send(Customerdata);
  } else {
    return next(new ErrorHander("failed to Customerdata", 404));
  }

});
