const { sign, verify } = require("jsonwebtoken");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const db = require("../../db/conn");
const User = db.Addusers;
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHander("Please Login to access this resource", 401));
    }

    const decodedData = jwt.verify(token, 'jwtsecretplschange');

    req.user = await User.findByPk(decodedData.id);

    next();
});

