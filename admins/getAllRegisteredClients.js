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
        const sql = `SELECT userId, name, email, role, businessType FROM users WHERE role = ?`;
        // protect against sql injection attack
        const esc = ['user']; 
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