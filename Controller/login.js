const express = require("express");
const app = express(); 

const asycHandler = require("express-async-handler");

const db = require("../db/conn");
const User = db.User;
const bcrypt = require("bcryptjs");


const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());

// const jwt = require("jsonwebtoken");
const { createTokens } = require("../JWT/jwt");

const login = asycHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "please fill the all fields properly" });
    }

    try {
        const loginexist = await User.findOne({ where: { email: email } });

        if (!loginexist) {
            res.status(400).json({ error: "user does not exist" })
        }

            const dbpassword = loginexist.password;
            // console.log(dbpassword);
            bcrypt.compare(password,dbpassword).then((match) => {
                if (!match) {
                    res.status(400).json({ error: "user invalid" });
                }
                const accessToken =  createTokens(loginexist);

                    res.cookie("access-token", accessToken, {
                      maxAge: 60 * 60 * 24 * 30 * 1000,
                      httpOnly: true,
                    });
    
                    res.status(201).json({ message: "user login sucessfully" })
            });
    } catch (error) {
        console.log(error);
    }
});


module.exports = login;