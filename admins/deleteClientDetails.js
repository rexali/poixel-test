const { transact } = require("../model/transact");

/** 
 * Remove a client details
 * @param {object} req - request object
 * @param {object} res - response object to user request
 */
const deleteClientDetails = async (req, res) => {
    try {
        // get a client id
        const id = req.body.userId;
        // prepare an sql to delete a client
        const sql = `DELETE FROM users WHERE userId=? and role=?`;
        // protect against sql injection attack
        const esc = [id,'user'];
        // get all clients' data
        const result = await transact(sql, esc);
        // send success data
        res.status(200).json({
            status: "success",
            data: {...result},
            message: "Client deleted",
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
    deleteClientDetails
}