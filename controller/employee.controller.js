const EmployeeServices = require("../services/employee.services");
const mongoose = require('mongoose');

exports.addEmployee = async (req, res, next) => {
    try {
        const { userId, employeeImage, employeeId, position, employeeName, employeeEmail, employeeNumber, employeeAddress } = req.body;

        let added = await EmployeeServices.addEmployee(userId, employeeImage, employeeId, position, employeeName, employeeEmail, employeeNumber, employeeAddress);

        res.json({ status: true, success: added });
    }
    catch (error) {
        next(error);
    }
}

exports.uploadPhoto = async (req, res, next) => {
    try {
        const { email } = req.body;

        const { type } = req.body;

        let photoUpload = await EmployeeServices.uploadPhoto(email, type);

        res.json({ status: true, success: photoUpload });
    }
    catch (error) {
        next(error);
    }
}

exports.searchDetails = async (req, res, next) => {
    try {
        const filter = req.query.filter || "";
        const userId = req.query.userId;  // Get userId from query params

        if (!userId) {
            return res.status(400).json({ status: false, message: "userId is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ status: false, message: "No users Registered yet" });
        }

        const employeeDetails = await EmployeeServices.searchDetails(userId, filter);

        res.json({ status: true, success: employeeDetails });
    }
    catch (error) {
        next(error);
    }
}

exports.singleEmployee = async (req, res, next) => {
    try {
        const { _id } = req.body;

        let singleDetail = await EmployeeServices.singleDetail(_id);

        res.json({ status: true, success: singleDetail });
    } catch (error) {
        next(error);
    }
};

exports.deleteEmployee = async (req, res, next) => {
    try {
        const { _id } = req.body;

        let deleted = await EmployeeServices.deleteEmployee(_id);

        res.json({ status: true, success: deleted });
    }
    catch (error) {
        next(error);
    }
}
