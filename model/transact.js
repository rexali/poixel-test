const { connectDb } = require("./connectDb");

/**
 * Perform transaction: CRUD operation (Create, Read, Update, Delete)
 * @param {String} sql - query string
 * @param {Array} esc - parameters to be escaped in query string
 * @returns object array
 */
function transact(sql, esc) {
    try {
        // instantiate a promise to get result from callback
        const promise = new Promise((resolve, reject) => {
            // connect to database and perform sql operation
            connectDb().query(sql, esc, function (err, result, fields) {
                if (err) {
                    // reject operation result
                    reject(err);
                }
                // resolve operation result
                resolve(result);
            });
        });

        return promise;
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    transact
}