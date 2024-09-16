const app = require('./app');
const db = require('./config/db');
const UserModel = require('./model/user.model');
const EmployeeModel = require('./model/employee.model');

const port = 3000;

app.get('/' , (req,res)=>{
    res.send('Server is running.');
})

app.listen(port, ()=> {
    console.log(`Server is listening on http://localhost:${port}`);
})