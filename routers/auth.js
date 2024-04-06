// routes/auth.js
const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/Auth/Login');
const RegisterController = require('../controllers/Auth/Register');
const RefreshTokenController = require('../controllers/Auth/RefreshToken');
router.post('/login',LoginController.index);
router.post('/register',RegisterController.index);
router.post('/refeshToken' , RefreshTokenController.index )
module.exports = router;