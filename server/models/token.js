const mongoose = require('mongoose');

const tokenScheme = new mongoose.Schema({
    token: {
        type: String,
        required: true
    } ,
    username: { 
        type: String,
        required: true
    }
});

tokenScheme.methods.isExpired = function (cb) {
    const token = this;
    if (token.expires < new Date().now) {
        
    }
};

module.exports =  mongoose.model('Token', tokenScheme);