const mongoose = require('mongoose');

const verifyCodeSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    code: String,
    expires: String
});

module.exports = mongoose.model('VerifyCode', verifyCodeSchema);
