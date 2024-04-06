// routes/auth.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User/Users');
const VerifyLogin = require('../middlewares/auth/VerifyLogin');

router.get('/',VerifyLogin.handle,UserController.index);
module.exports = router;