const express = require('express');
const app = express();
app.use(express.json());
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const users = require("./Routers/AdduserRoutes");
const workorder = require("./Routers/Addworkorder");
const login = require("./Routers/userRoutes");
const Customer = require("./Routers/Customermanagaemnet");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/Uploads",express.static('Uploads'))

app.use("/api", users);
app.use("/api", workorder);
app.use("/api", login);
app.use("/api", Customer);


// Middleware for Errors
app.use(errorMiddleware);
module.exports = app;
