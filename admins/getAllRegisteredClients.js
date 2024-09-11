const { transact } = require("../model/transact");

/** 
 * Get an all clients
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getAllRegisteredClients = async (req, res) => {
    try {
        // prepare an sql to get all clients' details
        const sql = `select userId, name, email, role, businessType from users`;
        // protect against sql injection attack
        const esc = []; 
        // get all clients' data
        const result = await transact(sql,esc);
        // send success data
        res.status(200).json({
            status: "success",
            data: [...result],
            message: "Registered clients collected",
        });

    } catch (error) {
        // catch  the error
        console.warn(error);
        // send error response
        res.status(200).json({
            status: "failed",
            data: null,
            message: "Error!"
        })
    }

}

module.exports = {
    getAllRegisteredClients
}