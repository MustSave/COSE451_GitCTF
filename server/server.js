const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');

const app = express();

require('dotenv').config();
var corsOptions = {
    origin: "http://localhost:8081",
    credentials: true,
};

// hide x-powered-by && set header for security
app.use(require("helmet")())
// enable cors option
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
// to use cookie
app.use(cookieParser());
// set header
app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

app.use("/auth", require("./app/routes/auth.routes.js"));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});