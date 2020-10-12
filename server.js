const path = require("path");
const express = require("express");
const fs = require('fs');

const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const sqlite3 = require('sqlite3').verbose();
var db = require('./database');

// load the local environment varaibles
dotenv.config();
var dir = path.join(__dirname, 'img');

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
app.use(express.static(dir));

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

app.get('/', (req, res) => {
    const msg = "Welcome to toddle task !! </br></br>*******************************************************</br></br>A.)Mock Authentication resulting signed jsonwebtoken [JWT].</br> &emsp;The jsonwebtoken will be there in the header named authoristaion.</br></br>*******************************************************</br></br>B.) Survey</br> &emsp;1.) Create survey.</br> &emsp;2.) Add Questions to survey.</br> &emsp;3.) Take survey (which displays questions).</br> &emsp;4.) Answer survey.</br> &emsp;5.) View results of survey.</br></br>*******************************************************</br></br>C.) Image Thumbnail generation.</br> &emsp;The resized image can be viewed in the below link.</br></br> &nbsp;&nbsp;&nbsp;&nbsp;https://survey-app-083.herokuapp.com/image_thumb.jpeg</br></br>*******************************************************</br>Database Schema.</br> &emsp;The database schema can be viewed in the below link.</br></br> &nbsp;&nbsp;&nbsp;&nbsp;https://survey-app-083.herokuapp.com/db_schema.png</br></br>*******************************************************</br>"
    res.status(200)
        .send(msg);

})

var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

app.get('*', function(req, res) {
    var file = path.join(dir, req.path.replace(/\/$/, '/index.html'));
    if (file.indexOf(dir + path.sep) !== 0) {
        return res.status(403).end('Forbidden');
    }
    var type = mime[path.extname(file).slice(1)] || 'text/plain';
    var s = fs.createReadStream(file);
    s.on('open', function() {
        res.set('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function() {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    });
});


const port = process.env.PORT || 3000;

let server = app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}!!`);
});
module.exports = { server: server };