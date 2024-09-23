const Login = require('../models/login');
const { hashPassword } = require('../utils/passwordHelper');


const getUserById = async (id) => {
    try {
        const user = await Login.findById(id);
        return user;
    } catch (error) {
        throw error;
    }

}


const getUserByUsername = async (userName) => {
    try {
        const user = await Login.findOne({ userName });
        return user;
    } catch (error) {
        throw error;
    }
}


const createUser = async (userData) => {
    try {
        const hashedPassword = hashPassword(userData.Pwd);
        const newUserData = { ...userData, Pwd: hashedPassword };
        const user = new Login(newUserData);
        const savedUser = await user.save();
        return savedUser._id;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getUserById,
    getUserByUsername,
    createUser
}