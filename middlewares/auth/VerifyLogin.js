const { verifyToken } = require('../../helpers/auth/data');
class VerifyLogin {
    handle(req, res, next) {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({message: 'Unauthorized 1'});
        }
        const verify = verifyToken(token);
        if (!verify) {
            return res.status(401).json({message: 'Unauthorized 2'});
        }
        req.user = verify;
        next();
    }
}
module.exports = new VerifyLogin();