const express = require("express");
// const cors = require("cors");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fileStore = require("session-file-store")(session);

const app = express();

require('dotenv').config();
// var corsOptions = {
//     origin: ["http://localhost:8081", "http://localhost:8000"],
//     credentials: true,
// };

// hide x-powered-by && set header for security
app.use(require("helmet")())
// enable cors option
// app.use(cors(corsOptions));

// parse requests of content-type - application/json and application/x-www-form-urlencoded
app.use(express.json(), express.urlencoded({extended: true}));

// to use cookie and session
app.use(cookieParser(), session({...require("./app/config/session.config"), store: new fileStore()}));


// set header
app.use(async function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );

    // check session expired
    // const expTime = 5000;
    const expTime = process.env.SESSION_EXPIRY_TIME * 1000;
    if (Date.now() - req.session?.__lastAccess > expTime) {
        await req.session.destroy(err=>{
            if (err) console.log(err);
            res.clearCookie("sessionId", {httpOnly: true, secure: !process.env.DEV });
            return res.status(408).send({message: "Session expired"});
        })
    }
    else
        next();
});

app.use("/auth", require("./app/routes/auth.routes.js"));
app.use("/data", require("./app/routes/data.routes.js"));
app.use("/user", require("./app/routes/user.routes.js"));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
