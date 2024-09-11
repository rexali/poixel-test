const express = require("express");

const { loginUserHandler } = require("./loginUserHandler");
const { registerUserHandler } = require("./registerUserHandler");
const { verifyUserTokenHandler } = require("./verifyUserTokenHandler");

// initialize authentication router
const authRouter = express.Router();

// login route
authRouter.post("/login", loginUserHandler);
// registeration route
authRouter.post("/register", registerUserHandler);
// verify token route
authRouter.post("/verify", verifyUserTokenHandler);

// export the authRouter
module.exports = {
    authRouter
}