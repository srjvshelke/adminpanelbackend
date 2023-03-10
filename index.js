const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});
require("./db/conn");
const app = require("./App");
app.use(cors());

//env


const PORT = process.env.PORT;
 

const server = app.listen(PORT, () => {
    console.log(`Server is working on http://localhost:${PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});



