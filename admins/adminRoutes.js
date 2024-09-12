const express = require("express");

const { getAllRegisteredClients } = require("./getAllRegisteredClients");
const { updateClientDetails } = require("./updateClientDetails");
const { deleteClientDetails } = require("./deleteClientDetails");
const { isOnlyAdmin } = require("../auth/isOnlyAdmin");

// initialize admin router
const adminRouter = express.Router();

// get all clients
adminRouter.get(
    '/getclients',
    isOnlyAdmin,         // middleware to make sure the user is an admin
    getAllRegisteredClients
);
// update a client
adminRouter.patch(
    "/updateclient",
    isOnlyAdmin,        // middleware to make sure the user is an admin
    updateClientDetails
);
// delete a client
adminRouter.delete(
    "/deleteclient",
    isOnlyAdmin,        // middleware to make sure the user is an admin
    deleteClientDetails
);

// export admin router
module.exports = {
    adminRouter
}