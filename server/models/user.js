const mongose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongose.Schema({
    'address':  String,
    'avatarUrl': String,
    'gender': Number,
    'nickname': String,
    'order': String,
    'remark': String,
    'telephone': String,
    'userId': String,
    'password': String,
    'username': {
        type: String,
        unique: true,
        required: true
    }
});
//Bcrypt middleware on UserSchema
UserSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password'))
        return next();

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) 
                return next();
            user.password = hash;
            next();
        });
    });
});
//密码比较
UserSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) 
            next();
        cb(isMatch);
    });
};
module.exports = mongose.model('User', UserSchema);