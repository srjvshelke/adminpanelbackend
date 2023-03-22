const express = require('express');
const app = express();
app.use(express.json());
const errorMiddleware = require("./middleware/error");

const users = require("./Routers/AdduserRoutes");
const workorder = require("./Routers/Addworkorder");
const login = require("./Routers/userRoutes");


app.use("/api", users);
app.use("/api", workorder);
app.use("/api", login);


// Middleware for Errors
app.use(errorMiddleware);
module.exports = app;
