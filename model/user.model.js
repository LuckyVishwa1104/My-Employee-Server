const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const { Schema } = mongoose;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true },);

userSchema.pre('save', async function () {
    try {
        var user = this;
        const salt = await (bcrypt.genSalt(5));
        const haspass = await bcrypt.hash(user.password, salt);
        user.password = haspass;
    } catch (error) {
        throw error;
    }
});

userSchema.methods.comparePassword = async function (password) {
    try {
        const isMatch = await bcrypt.compare(password, this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
}

const UserModel = db.model('UsersDetail', userSchema);

module.exports = UserModel;