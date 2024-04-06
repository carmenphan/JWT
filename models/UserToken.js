const mongoose = require('mongoose');

const UserTokenSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String , required: true},
}, {timestamps: true}); // Add timestamps

const UserToken = mongoose.model('UserToken', UserTokenSchema);

module.exports = UserToken;