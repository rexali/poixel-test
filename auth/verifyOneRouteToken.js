var { expressjwt: verifyOneRouteToken } = require("express-jwt");


module.exports = verifyOneRouteToken({
    // secret key
    secret: "shhhhhhared-secret",
    // get the token
    getToken: req => {
        // get the jwtoken from the authorization header or cookie
        if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {

            return req.headers.authorization?.split(' ')[1];

        } else if (req.query && req.query.token) {

            return req.query.token;

        } else if (req.body && req.body.token) {

            return req.body.token;
            
        } else if (req.cookies && req.cookies.token) {

            return req.cookies.token;
        }

        return null;
    },
    algorithms: ['HS256'],
});

