const UserService = require('../../services/UserService');

class Users{
    async index (req, res) {
        const users = await UserService.getAllUsers();
        res.json(users);

    }
}
module.exports = new Users();