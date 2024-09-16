const router = require('express').Router();
const UserController = require('../controller/user.controller');

router.post('/registration', UserController.regiterUser);

router.post('/login', UserController.loginUser);

router.post('/userProfile', UserController.userProfile);
    
module.exports = router;
