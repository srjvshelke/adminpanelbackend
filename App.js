const express = require('express');
const app = express();
app.use(express.json());
const errorMiddleware = require("./middleware/error");



const users = require("./Routers/AdduserRoutes");
const workorder = require("./Routers/Addworkorder");


app.use("/api", users);
app.use("/api", workorder);



// Middleware for Errors
app.use(errorMiddleware);
module.exports = app;
