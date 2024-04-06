const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String},
    email: { type: String, unique: true },
    admin: { type: Boolean, default: false }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;