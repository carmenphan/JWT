const {generateToken, generateRefreshToken , verifyRefreshToken} = require('../../helpers/auth/data');
const User = require('../../models/Users');
const UserToken = require('../../models/UserToken');
const cookie = require('cookie');
class RefreshToken {
  async index (req, res) {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
      return res.status(401).json({message: 'Unauthorized 1'})
    }
    const validRefreshToken = verifyRefreshToken(refreshToken)
    if (!validRefreshToken) {
      return res.status(401).json({message: 'Unauthorized 2'})
    }
    const UserData = await User.findById(validRefreshToken._id)
    if (!UserData) {
      return res.status(401).json({message: 'Unauthorized 3 '})
    }
    const refreshTokenDB = await UserToken.findOne({user_id: UserData._id}).select('refreshToken');
    if (!refreshTokenDB || refreshTokenDB.refreshToken !== refreshToken) {
      return res.status(401).json({message: 'Unauthorized 4'})

    }

    const accessToken = generateToken(UserData)
    const newRefeshToken = generateRefreshToken(UserData)
    await UserToken.updateOne({user_id: UserData._id}, {refreshToken: newRefeshToken});
    res.setHeader('Set-Cookie', cookie.serialize('refreshToken', newRefeshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production' ? true : false,
      path: '/'
    }));
    res.status(200).json({message: 'User authenticated', accessToken});
  }
}
module.exports = new RefreshToken();