const usersRepositories = require('../repositories/login');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const { createJwt } = require('../utils/jwtHelper');
const { compareWithHashedPassword } = require('../utils/passwordHelper');


const createUser = asyncHandler(async (req, res, next) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return next(new ErrorResponse('All fields are required', 400))
    }

    const user = await usersRepositories.getUserByUsername(userName);
    if (user) {
        return next(new ErrorResponse('Username already taken', 400))
    }


    if (password.length < 8) {
        return next(new ErrorResponse('Password must be at least 8 characters long', 400));
      }
    const userId = await usersRepositories.createUser({
        userName,
        Pwd:password
    });

    const token = createJwt(userId);
    res.status(201).json({ success: true, data: { token } });

})

const loginUser = asyncHandler(async (req, res, next) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return next(new ErrorResponse('Username and password required', 400));
    }

    const user = await usersRepositories.getUserByUsername(userName);

    if (!user) {
        return next(new ErrorResponse('Invalid username or password', 401));
    }

    const isMatch = compareWithHashedPassword(password, user.Pwd);
    if (!isMatch) {
        return next(new ErrorResponse('Invalid username or password', 401));
    }

    const token = createJwt(user._id);
    res.status(200).json({ success: true, data: {  token, userName } });
})




module.exports = {
    createUser,
    loginUser
}