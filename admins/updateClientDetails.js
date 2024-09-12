const { transact } = require("../model/transact");
/**
 * Delete a client profile
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const updateClientDetails = async (req, res) => {

    try {
        // retrieve the request body data
        const {
            name,
            email,
            businessType,
            role,
            userId
        } = req.body;
        // prepare an sql to update a client
        const sql = `UPDATE users SET  
        name = ?, 
        email = ?, 
        businessType = ? WHERE userId =? AND role = ?`;

        const escapeClientData = [
            name,
            email,
            businessType,
            userId,
            role
        ];
        //  update client now
        const result = await transact(sql, escapeClientData);
        // check that an update is made to the table
        if (result.affectedRows === 1) {
            // send data as json
            res.status(200).json({
                status: "success",
                data: result,
                message: "Client updated"
            })
        }

    } catch (error) {
        console.warn(error);
         // send data as json
         res.status(200).json({
            status: "failed",
            data: result,
            message: "Update failed"
           
        })
    }

};

module.exports = {
    updateClientDetails
}