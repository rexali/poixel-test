// import required modules
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require('dotenv');
// initiatize the .env
dotenv.config();
// import error and log handlers
const { logHandler } = require("./utils/logHandler");
const { errorHandler } = require("./utils/errorHandler");
// import auth and admin routes
const { authRouter } = require("./auth/authRoutes");
const { adminRouter } = require("./admins/adminRoutes");
const { getJWToken } = require("./auth/getJWToken");
// import jwt verifying handlers
const verifyOneRouteToken = require("./auth/verifyOneRouteToken");
const verifyAllRoutesToken = require("./auth/verifyAllRoutesToken");
// instantiate express
const app = express();
// port
const PORT = 3001;
// host
const HOST = "localhost";
// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse cookies
app.use(cookieParser());
// apply default cors to the server 
app.use(cors());
// static file
app.use(express.static("public"));
// get error 
app.use(errorHandler);
//log request info in the console
app.use(logHandler);
// protect all routes
app.use(verifyAllRoutesToken);
// define auth and admin routes
app.use("/auth", authRouter);
app.use("/admins", adminRouter);
// set view engine
app.set('view engine', 'ejs');
// set views
app.set('views', 'views');

// server home
app.get("/", (req, res) => {
    try {
        // render home page
        res.render("home", {});
    } catch (error) {
        // catch error
        console.warn(error);
        res.status(500).json({
            status: "fail",
            data: null,
            message: "Internal server error"
        });
    }
});
// protected a specific route
app.get(
    "/protected",
    verifyOneRouteToken,
    // callback handler
    function (req, res) {
        if (!req.auth.role) {

            return res.sendStatus(401)
        }
        console.log(req.auth.role);
        res.sendStatus(200);
    }
);
app.get("/jwt", getJWToken);
// catch not-found resources
app.use((req, res, next)=>{
    // return json
    res.status(404).json({
        status: "fail",
        data: null,
        message: "404 Not Found"
    });
});

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        // return json
        res.status(401).json({
            status: "fail",
            data: null,
            message: "Error: " + err.message
        });

    } else {
        next(err);
    }
});
// listent to server  
app.listen(PORT, HOST, () => {
    // log to the console
    console.log(`The server host is ${HOST} and is listening at port ${PORT}`);
});
// make app object available to the whole application
module.exports = app;

