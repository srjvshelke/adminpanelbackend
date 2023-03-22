const { sign, verify } = require("jsonwebtoken");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");

const createTokens = (User) => {
    const accessToken = sign(
        { username: User.email, id: User.id },
        "jwtsecretplschange"
    );

    return accessToken;

};

const validateToken = catchAsyncErrors(async (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        return next(new ErrorHander("Please Login to access this resource", 401));
    }
    const validToken = verify(accessToken, "jwtsecretplschange");
    if (validToken) {
        req.authenticated = true;
        return next();

    }
});

module.exports = { createTokens, validateToken };
