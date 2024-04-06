// routes/admin.js
const express = require('express');
const router = express.Router();
const VerifyAdmin = require('../middlewares/auth/VerifyAdmin');

router.get('/',VerifyAdmin.handle,(req, res) => {
    res.status(200).json({message: 'Admin Page'})
})
module.exports = router;