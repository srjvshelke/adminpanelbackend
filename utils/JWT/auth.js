const { sign, verify } = require("jsonwebtoken");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const ErrorHander = require("../errorhander");
const db = require("../../db/conn");
const User = db.Addusers;
const jwt = require("jsonwebtoken");
const client = require("../../redis");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHander("Please Login to access this resource", 401));
    }

    const decodedData = jwt.verify(token, 'jwtsecretplschange');
    var user = await client.hGet("userdata",String(decodedData.id));
    req.user = JSON.parse(user);
    // req.user = await User.findByPk(decodedData.id);

    next();
});

