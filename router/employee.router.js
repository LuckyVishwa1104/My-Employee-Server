const router = require('express').Router();

const EmployeeController = require("../controller/employee.controller.js");

router.post('/addEmployee', EmployeeController.addEmployee);

router.post('/uploadPhoto', EmployeeController.uploadPhoto);

router.get('/bulk', EmployeeController.searchDetails);

router.post('/employee', EmployeeController.singleEmployee);

router.post('/deleteEmployee', EmployeeController.deleteEmployee);

module.exports = router;