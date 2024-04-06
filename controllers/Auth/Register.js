const User = require('../../models/Users');
const bcrypt = require('bcrypt');
class Register {
    async index(req, res) {
       const {username, password , email} = req.body;
       const user = await User.findOne({username});
        if (user) {
            return res.status(400).json({message: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = await User.create({username, password : hashedPassword , email});
        const userWithoutPassword = await User.findOne({username}).select('-password');
        res.status(200).json({message: 'User created', user : userWithoutPassword});

  }
}
module.exports = new Register();