const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    userName: {
        type: String,
        require
    },
    Pwd: {
        type: String,
        require
    }
});


const Login = mongoose.model('Login', loginSchema);
module.exports = Login;