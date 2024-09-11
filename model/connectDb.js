var mysql = require("mysql2");
const dotenv = require('dotenv');
dotenv.config();

/**
 * Create connection to the database
 * @param conn is mysql connection using:
 * @param host hostname
 * @param user username
 * @param password password
 * @param database database name
 * @returns conn object
 */
function connectDb() {
    try {
        // create connection object
        const conn = mysql.createConnection({
            host: process.env.DB_POST, //database host: 3306,
            user: process.env.DB_USER, //database username: root",
            password: process.env.DB_PASS, //database password,
            database: process.env.DB_NAME, //database name: poixeldb,
        });
        //  connect to database
        conn.connect(function (err) {
            if (err) throw err;
            console.log("Connected to db!");
        });

        return conn;
    } catch (error) {
        console.warn(error);
    }
}

module.exports = {
    connectDb
}