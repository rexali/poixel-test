const jsonwebtoken = require("jsonwebtoken");

function getJWToken(req, res) {
    try {
        // get a signed token
        const jwtoken = jsonwebtoken.sign({ role: "admin" }, "shhhhhhared-secret");
        //  store in a secured cookie
        res.cookie('jwtoken', jwtoken, { httpOnly: true });
        //  turn the token to json
        res.status(200).json({
            status: "success",
            message: "jwtoken created",
            data: { jwtoken }
        });
    } catch (error) {
        // catch error
        console.warn(error);
        res.status(500).json({
            status: "fail",
            message: "jwtoken creation failed: " + error.message,
            data: { jwtoken }
        });
    }
}

module.exports = {
    getJWToken
}