// Database Connection

const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/Authentication_Users");


// Check Database connected or not

connect.then(() => {
    console.log("Database connected Successfully");
})
    .catch(() => {
        console.log("Database cannot be connected");
    });

// create a schema
const loginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


// collection part

const collection = new mongoose.model("login_users", loginSchema);

module.exports = collection;