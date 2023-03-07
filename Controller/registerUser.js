const asycHandler = require("express-async-handler");

const db = require("../db/conn");
const User = db.User;
const bcrypt =  require("bcryptjs");

const registerUser = asycHandler(async (req, res) => {

    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the fields");
    }

    const userexist = await User.findOne({ where: { email: email } });
    if (userexist) {
        res.status(400);
        throw new Error("user already exists");
    }
    let hashpassword = await bcrypt.hash(password,8);
    const userdata = await User.create({
        name: name,
        email: email,
        password: hashpassword,
        pic: pic
    })
    if (userdata) {
        res.status(201).send(userdata);
    } else {
        res.status(400);

        throw new Error("failed to create user");
    }
})
module.exports = registerUser;