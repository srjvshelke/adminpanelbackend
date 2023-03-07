const express = require('express');
const app = express(); 
app.use(express.json());
const errorMiddleware = require("./middleware/error");

//route imports

const users = require("./Routers/AdduserRoutes");
app.use("/api",users);





// Middleware for Errors
app.use(errorMiddleware);

module.exports = app ;