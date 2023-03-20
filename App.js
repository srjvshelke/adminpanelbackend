const express = require('express');
const app = express(); 
const redis = require("redis");
app.use(express.json());
const errorMiddleware = require("./middleware/error");


//redis implementation
const redisurl = "redis://localhost://:6379";
const client = redis.createClient(redisurl)
client.on('error', err => console.log('Redis Client Error', err));
const util = require("util");
client.set = util.promisify(client.set);
client.get = util.promisify(client.get);
await client.connect(()=>{
    console.log("redis server connected");
});

/////////////////////////////////////////////////

//route imports

const users = require("./Routers/AdduserRoutes");
const workorder = require("./Routers/Addworkorder");
app.use("/api",users);
app.use("/api",workorder);





// Middleware for Errors
app.use(errorMiddleware);

module.exports = app ;