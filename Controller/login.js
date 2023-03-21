const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const db = require("../db/conn");
const User = db.Addusers;
const bcrypt = require("bcryptjs");

const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());

// const jwt = require("jsonwebtoken");
const { createTokens } = require("../utils/JWT/jwt");

exports.login = catchAsyncErrors(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHander("Please Enter Email & Password", 400));
    }
    const loginexist = await User.findOne({ where: { email: email } });
    if (!loginexist) {
        return next(new ErrorHander("Invalid email or password", 401));
    }
    const dbpassword = loginexist.password;
    // console.log(dbpassword);
    bcrypt.compare(password, dbpassword).then((match) => {
        if (!match) {
            return next(new ErrorHander("Invalid email or password", 401));
        }
        const accessToken = createTokens(loginexist);
        res.cookie("access-token", accessToken, {
            maxAge: 60 * 60 * 24 * 30 * 1000,
            httpOnly: true,
        });
        res.status(201).json({ message: "user login sucessfully" })
    });
});
