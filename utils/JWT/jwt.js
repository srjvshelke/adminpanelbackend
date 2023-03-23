const { sign, verify } = require("jsonwebtoken");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");


const sendToken = (user, statusCode, res) => {
  
    const token =  sign(
        { username: user.email, id: user.ID },
        'jwtsecretplschange'
    );
    // options for cookie
    const options = {
        maxAge: 60 * 60 * 24 * 30 * 1000,
        httpOnly: true,
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    });
};


// exports.createTokens = (User) => {
//     const accessToken = sign(
//         { username: User.email, id: User.id },
//         'jwtsecretplschange'
//     );

//     return accessToken;

// };

// const validateToken = catchAsyncErrors(async (req, res, next) => {
//     const accessToken = req.cookies["access-token"];

//     if (!accessToken) {
//         return next(new ErrorHander("Please Login to access this resource", 401));
//     }
//     const validToken = verify(accessToken, 'jwtsecretplschange');
//     if (validToken) {
//         req.authenticated = true;
//         return next();

//     }
// });


module.exports = sendToken;

