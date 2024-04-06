const User = require('../../models/Users');
const UserToken = require('../../models/UserToken');
const bcrypt = require('bcrypt');
const {generateToken, generateRefreshToken} = require('../../helpers/auth/data');
const cookie = require('cookie');

class Login {

    async index(req, res) {
        const {username, password} = req.body;
        const user = await User.findOne({username}).select("+password");
        if (!user) {
            return res.status(400).json({message: 'User not found'});
        }
        console.log(user);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }
        const userWithoutPassword = await User.findOne({username}).select('-password');
        const accessToken = generateToken(user)
        const refeshToken = generateRefreshToken(user)
        await UserToken.findOneAndDelete({user_id: user._id});
        await UserToken.create({user_id: user._id, refreshToken: refeshToken});
        res.setHeader('Set-Cookie', cookie.serialize('refreshToken', refeshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 365,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production' ? true : false,
            path: '/'
        }));
        res.status(200).json({message: 'User authenticated',userWithoutPassword , accessToken});
    }
}
module.exports = new Login();