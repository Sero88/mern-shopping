const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    thirdPartyId: String,
    firstName: String, 
    lastName: String,
    email: String, 
    lastLogin: Date
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;