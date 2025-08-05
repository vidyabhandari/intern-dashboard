const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    referralCode: {type: String},
    totalDonations: {type: Number,default: 0}
});

module.exports = mongoose.model('User',userSchema)