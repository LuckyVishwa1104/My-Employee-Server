const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./router/user.router');
const employeeRouter = require('./router/employee.router');

const app = express();
app.use(bodyParser.json());
app.use('/',userRouter);
app.use('/',employeeRouter);

module.exports = app;