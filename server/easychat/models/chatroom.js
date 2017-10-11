const mongoose = require('mongoose');

const chatroomScheme = new mongoose.Schema({
    socketId: {
        type: String,
        required: true
    } ,
    username: { 
        type: String,
        required: true,
        unique: true
    }
});

module.exports =  mongoose.model('Chatroom', chatroomScheme);