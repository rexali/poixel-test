// import required modules
const express = require("express");

// instantiate express
const app = express();
// port
const PORT = 3001;
// host
const HOST = "localhost";

// server home
app.get("/", (req, res) => {
    res.status(500).json({
        status: "success",
        data: { name: "Poixel" },
        message: "Homepage loaded"
    });
});

app.post("/auth/register", (req, res) => {
    res.status(500).json({
        status: "success",
        data: {
            ...req.body
        },
        message: "Registration successfull"
    });
})

app.post("/auth/login", (req, res) => {
    let mock_data = { ...req.body }
    res.status(200).json({
        status: "success",
        data: {
            ...mock_data
        },
        message: "Login successfull"
    });
})


app.get("/admins/getclients", (req, res) => {
    let mock_data = [{
        userId: 1,
        name: "Aliyu Bello",
        email: "alybaba2009@gmail.com",
        role: "user",
        businessType: "Fish Farming"
    }]
    res.status(200).json({
        status: "success",
        data: mock_data,
        message: "Clients found"
    });
})


app.delete("/admins/deleteclient", (req, res) => {
    let mock_data = { ...req.body }
    res.status(200).json({
        status: "success",
        data: mock_data,
        message: "Delete successfull"
    });
})


app.patch("/admins/updateclient", (req, res) => {
    let mock_data = { ...req.body}
    res.status(200).json({
        status: "success",
        data: mock_data,
        message: "Update successfull"
    });
})

// catch not found page
app.use((req, res) => {
    try {
        // return json
        res.status(404).json({
            status: "fail",
            data: null,
            message: "page not found"
        });
        // catch error
    } catch (error) {
        // log error
        console.warn(error);
        res.status(500).json({
            status: "fail",
            data: null,
            message: "Internal server error"
        });
    }
});

// listent to server  
app.listen(PORT, HOST, () => {
    // log to the console
    console.log(`The server host is ${HOST} and is listening at port ${PORT}`);
});
// make app object available to the whole application
module.exports = app;