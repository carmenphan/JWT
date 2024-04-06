const veryfyLogin = require('./VerifyLogin');
class VerifyAdmin {
    handle(req, res, next) {
        veryfyLogin.handle(req, res, () => {
            console.log(req.user)
            if (!req.user.admin) {
                return res.status(401).json({message: 'Unauthorized Not admin'});
            }
        })
        next();
    }
}
module.exports = new VerifyAdmin();