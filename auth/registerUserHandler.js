const { hashpass } = require("../utils/hashHelper");
const { escapeHTML } = require("../utils/escapeHTML");
const { transact } = require("../model/transact");
const { Mutex } = require("async-mutex");

// create mutex instance
const mutex = new Mutex();

/**
 * Register new user
 * @param {object} req - user request object
 * @param {object} res - response to user request
 * @returns void
 */
const registerUserHandler = async (req, res) => {
    // acquire access to path, lock it to prevent race condition
    const release = await mutex.acquire();
    // get the reaquest body data
    const {
        name,
        password,
        email,
    } = req.body;

    // declare clientData
    let clientData;
    // get user role
    let role = req.body.role ?? "user";
    // get businessType
    let businessType= req.body.businessType ?? "";

    try {
        // initilise client data and escape each client details to protect XSS attack
        clientData = {
            name: escapeHTML(name),
            email: escapeHTML(email),
            password: escapeHTML(password),
            businessType: escapeHTML(businessType),
            role: escapeHTML(role)
        }
    } catch (error) {
        //   catch escapeHTML error
        res.status(400).json({
            status: "failed",
            message: "Error: " + error.message,
            data: null
        });
    }

    try {
        // hash the user password
        const hassPassword = hashpass(clientData.password);
        // escape email and password to prevent sql injection attack
        const esc = [clientData.name, clientData.email, hassPassword, clientData.businessType, clientData.role]
        // prepare sql to enter data to user table
        const sql = `INSERT INTO users (name, email, password, businessType, role) VALUES (?,?,?,?,?)`;

        try {
            // enter data to users table
            const registrationResult = await transact(sql, esc);
            // check if insert Id is defined
            if (registrationResult.insertId) {
                // send result in json data
                res.status(200).json({
                    status: "success",
                    message: "registration successful",
                    data: { ...registrationResult }
                });
            }
            // catch error
        } catch (error) {
            // log error
            console.warn(error);
            res.status(400).json({
                status: "failed",
                message: "registration unsuccessful",
                data: null
            });
        }

        // catch error
    } catch (error) {
        // log error
        console.warn(error);
        res.status(500).json({
            status: "failed",
            message: "registration unsuccessful",
            data: null
        });
    } finally {
        // release path for other
        release();
    }


}

module.exports = {
    registerUserHandler
}