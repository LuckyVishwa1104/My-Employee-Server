const UserModel = require("../model/user.model");
const jwt = require('jsonwebtoken');

class UserServices {
    static async UserRegistration(userName, email, password) {
        try {
            const registerUser = new UserModel({ userName, email, password })
            return await registerUser.save();
        }
        catch (err) {
            throw err;
        }
    }

    static async checkUser(email) {
        try {
            return await UserModel.findOne({ email });
        } catch (err) {
            throw err
        }
    }

    static async generateToken(tokenData, secretKey, jwt_expiry) {
        return jwt.sign(tokenData, secretKey, { expiresIn: jwt_expiry });
    }

    static async userProfile(_id) {
        const userData = await UserModel.findById(_id);
        return userData;
    }

}

module.exports = UserServices;