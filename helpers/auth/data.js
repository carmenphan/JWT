const jwt = require('jsonwebtoken');

require('dotenv').config();
const generateToken = (user) => {
    const payload = {
        _id: user._id,
        admin: user.admin
    };
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '2h'});
}
const generateRefreshToken = (user) => {
    const payload = {
        _id: user._id,
        admin: user.admin
    };
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '365d'});
}
const verifyToken = (token) => {
    console.log(token)
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return false;
        }
        return user;
    });
}
const verifyRefreshToken = (token) => {
    console.log(token)
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return false;
        }
        return user;
    });
}
module.exports = {generateToken, generateRefreshToken , verifyToken ,  verifyRefreshToken};