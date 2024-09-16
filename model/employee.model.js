const db = require('../config/db');
const UserModel = require('../model/user.model.js');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName
    },
    employeeImage: {
        type: String,
        required: true,
    },
    employeeId: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    employeeName: {
        type: String,
        required: true,
    },
    employeeEmail: {
        type: String,
        required: true,
    },
    employeeNumber: {
        type: String,
        required: true,
    },
    employeeAddress: {
        type: String,
        required: true,
    },

}, { timestamps: true },);

const EmployeeModel = db.model('employeeModel', employeeSchema);
module.exports = EmployeeModel;