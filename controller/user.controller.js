const { use } = require('../app');
const UserModel = require('../model/user.model');
const UserServices = require('../services/user.services');

exports.regiterUser = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;
        const registerUser = await UserServices.UserRegistration(userName, email, password);
        res.json({ status: true, success: 'User register successfully.' });
    }
    catch (err) {
        throw err;
    }
}

exports.userProfile = async (req, res, next) => {
    try {
        const { _id } = req.body;

        let userData = await UserServices.userProfile(_id);

        res.json({ status: true, success: userData });
    } catch (error) {
        next(error);  // Correct error handling
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        const user =await UserServices.checkUser(email);

        if (!user){
            throw new Error('User does not Exist!');
        }

        const isMatch =await user.comparePassword(password);

        if (isMatch === false){
            throw new Error('Incorrect password!');
        }

        let tokenData = {_id: user._id, email: user.email};

        const token = await UserServices.generateToken(tokenData, "secretkey", '1h');

        res.status(200).json({status: true, token: token});

    } catch (err) {
        throw err;
    }
}
