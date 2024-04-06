const Users = require('../models/Users')

class UserService{


    async getUserById(id) {
        return await Users.findById(id);
    }
    async getUserByUsername(username) {
        return await Users.findOne({username});
    }
    async getUserByEmail(email) {
        return await Users.findOne({email});
    }
    async createUser(data) {
        return await Users.create(data);
    }
    async updateUser(id, data) {
        return await Users.findByIdAndUpdate
        (id, data, {new: true});
    }
    async deleteUser(id) {
        return await Users.findByIdAndDelete(id);
    }
    async getAllUsers() {
        return await Users.find();
    }
}
module.exports = new UserService();