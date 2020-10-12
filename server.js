const path = require("path");
const express = require("express");

const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const sqlite3 = require('sqlite3').verbose();
var db = require('./database');

// load the local environment varaibles
dotenv.config();


// intializing the app instance
const app = express();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    // website which can only access this backend server
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");

    // Request methods which are allowed to this backend server
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");

    // Request headers which are allowed to this backend server
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    res.header("Access-Control-Expose-Headers", "*");

    // Pass to next layer
    next();
};

// Middleware
// for converting the json part of the request body
app.use(express.json());
app.use(bodyParser.json());

// for allowing requests from the frontend or other domains
app.use(allowCrossDomain);

if (process.env.Node_Env === "development") {
    // for logging the infomation
    app.use(morgan("tiny"));

    // for securing the routes with adding headers
    app.use(helmet());

    console.log("Logging the data using morgan");
}

// Route for authentication routes
app.use("/api/auth", require("./routes/auth/auth"));

app.use("/api/survey", require("./routes/survey/survey"));

app.use("/api/image", require("./routes/image/image"));



const port = process.env.PORT || 3000;

let server = app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}!!`);
});
module.exports = { server: server };