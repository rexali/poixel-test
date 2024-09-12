const { getUserPassword } = require("./getUserPassword");
const { getUserToken } = require("./getUserToken");
const { checkpass } = require("../utils/hashHelper");
const { escapeHTML } = require("../utils/escapeHTML");
const { Mutex } = require("async-mutex");

// create mutex instance
const mutex = new Mutex();
/**
 * Login user
 * @param {object} req - user request 
 * @param {object} res - response to user request
 * @returns void
 */
const loginUserHandler = async (req, res) => {
    // acquire access to the path to do operation (to prevent race condition)
    const release = await mutex.acquire();
    try {
        // get email and password
        const { email, password} = req.body;
        //   check if email and password are not null
        if (!email) {
            //    if null, send response
            res.status(404).json({
                status: "fail",
                message: "email missing",
                data: {}
            });
        }
        // check if password is not null
        if (!password) {
            //    if null, send response
            res.status(404).json({
                status: "fail",
                message: "password missing",
                data: null
            });
        }
        //  check if both email and password provided
        if (email && password) {
            // make safe email and password by escaping html elements
            const clientData = {
                email: escapeHTML(email),
                password: escapeHTML(password)
            }
            // sql input data to be escape
            const esc = [clientData.email];
            //  prepare sql
            const sql = `SELECT password FROM users WHERE email = ?`;
            // get password user password in database
            const dbPassword = await getUserPassword(sql, esc);
            // check to see it is not empty or undefined
            if (!dbPassword) {
                //    if null, send response
                res.status(404).json({
                    status: "fail",
                    message: "email doesn't match any registered user",
                    data: null
                });
            }
            // verify the database password with password provided by user
            if (checkpass(dbPassword, clientData.password)) {
                // prepare SQL to get authenticated user detail
                const sql = `SELECT userId, email, role FROM users WHERE email = ?`;
                // get logged-in token
                const { token } = await getUserToken(sql, esc);
                //  store in cookie
                res.cookie('token', token, { httpOnly: true, secure: false });
                // send token and other detail
                res.status(200).json({
                    status: "success",
                    message: "Logged in successfully",
                    data: { token }
                });

            } else {
                res.status(404).json({
                    status: "failed",
                    message: "password mismatch",
                    data: null
                });
            }

        } else {
            res.status(404).json({
                status: "fail",
                message: "email or password missing",
                data: null
            });
        }

    } catch (error) {
        // catch error
        console.warn(error);
    } finally {
        // release path for other
        release();
    }

}

module.exports = {
    loginUserHandler
}