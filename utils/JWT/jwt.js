const { sign, verify } = require("jsonwebtoken");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");

const createTokens = (User) => {
    const accessToken = sign(
        { username: User.email, id: User.id },
        process.env.JWTPIN
    );

    return accessToken;

};

const validateToken = catchAsyncErrors(async (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        return next(new ErrorHander("Please Login to access this resource", 401));
    }
    const validToken = verify(accessToken,  process.env.JWTPIN);
    if (validToken) {
        req.authenticated = true;
        return next();

    }
});

module.exports = { createTokens, validateToken };
