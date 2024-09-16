const EmployeeModel = require("../model/employee.model");
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require('dotenv').config();

class EmployeeServices {

    static async addEmployee(userId, employeeImage, employeeId, position, employeeName, employeeEmail, employeeNumber, employeeAddress) {
        const added = new EmployeeModel({ userId, employeeImage, employeeId, position, employeeName, employeeEmail, employeeNumber, employeeAddress });
        return await added.save();
    }

    static async singleDetail(_id) {
        const s3Client = new S3Client({
            region: "ap-south-1",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });

        const singleDetail = await EmployeeModel.findById(_id);

        if (!singleDetail) {
            throw new Error('Employee not found');
        }

        const command = new GetObjectCommand({
            Bucket: "theemployee",
            Key: singleDetail.employeeImage,
        });

        const photoUrl = await getSignedUrl(s3Client, command);

        return {
            ...singleDetail.toObject(),
            objectUrl: photoUrl,
        };
    }


    static async uploadPhoto(email, type) {

        const s3Client = new S3Client({
            region: "ap-south-1",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            }
        });

        const min = 1000000000;
        const max = 9999999999;
        const randomNumber = Math.floor(min + Math.random() * (max - min + 1));
        const randomString = randomNumber.toString();

        const photoKey = `employees/${email + randomString}.jpg`;

        const command = new PutObjectCommand({
            Bucket: "theemployee",
            Key: photoKey,
            ContentType: type,
        });

        const url = await getSignedUrl(s3Client, command);

        return [url, photoKey];

    }

    static async searchDetails(userId, filter) {
        const s3Client = new S3Client({
            region: "ap-south-1",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });

        let query = { userId: userId };

        if (filter) {
            query = {
                $and: [
                    { userId: userId },
                    {
                        $or: [
                            { employeeId: { "$regex": filter, "$options": "i" } },
                            { position: { "$regex": filter, "$options": "i" } },
                            { employeeName: { "$regex": filter, "$options": "i" } },
                            { employeeEmail: { "$regex": filter, "$options": "i" } }
                        ]
                    }
                ]
            };
        }

        const EmployeeDetails = await EmployeeModel.find(query);

        const employeeDetailsWithUrl = await Promise.all(
            EmployeeDetails.map(async (item) => {
                const command = new GetObjectCommand({
                    Bucket: "theemployee",
                    Key: item.employeeImage,
                });
                const photoUrl = await getSignedUrl(s3Client, command);

                return {
                    ...item.toObject(),
                    objectUrl: photoUrl,
                };
            })
        );

        return employeeDetailsWithUrl;
    }

    static async deleteEmployee(_id) {
        const deleted = await EmployeeModel.findOneAndDelete({ _id: _id });
        return deleted;
    }
}

module.exports = EmployeeServices;
