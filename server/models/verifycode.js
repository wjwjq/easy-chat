const mongoose = require('mongoose');

const verifyCodeSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    code: String,
    expires: new Date.now()/1000
});

