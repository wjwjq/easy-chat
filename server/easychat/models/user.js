const mongose = require('mongoose');
const bcrypt = require('bcryptjs');

const tokenManager = require('../middlewares/tokenManager');

//引入状态常量
const {
    USER_NOT_EXISTED,
    USER_ALREADY_EXISTED,
    USER_AUTH_FAIL,
    USER_AUTH_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_SUCCESS
} = require('../constant/status');

const UserSchema = new mongose.Schema({
    'address':  String,
    'avatarUrl': String,
    'gender': Number,
    'nickname': String,
    'order': String,
    'remark': String,
    'password': String,
    'friends': [String],
    'latestMessages': [
        {
            'friendId': String,
            'data': {
                'from': String,
                'to': String,
                'content': String,
                'publishTime': String
            }
        }
    ],
    'latestFriendRequest': Array,
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
            user.friends.push(user.username);
            user.avatarUrl = user.remark || '';
            user.remark = user.remark || '';
            user.order =  user.order || 'A',
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

const Users = mongose.model('User', UserSchema);

//导出 model Users
exports.Users = Users;

//创建用户
exports.createUser = function (userParams) {
    return new Promise((resolve, reject) => {
        const user = new Users(userParams);
        user.save((err) => {
            if (err) {
                return reject(USER_ALREADY_EXISTED);
            }
            resolve(USER_AUTH_SUCCESS);
        });
    });
};

/**
* 查询用户是否存在
*
* @param options{
*     type {String} 功能  
*     query {Object}  查询条件 eg: { username: '18990655833' }
*     [populate={}] {Object}  过滤参数 eg: { password: 0 }
*     valid {Object} 验证附加条件 eg： {upsert: true}
* }
* @returns 
*        如果type === signup, 那么表示当前查询操作为注册发出,此时若无此用户,将返回成功
*        如果type 为其它值，那么将返回查询成功的用户信息
*/
exports.queryUser = function ({ type, query, populate, valid }) {
    return new Promise((resolve, reject) => {
        Users
            .findOne(query, populate, valid)
            .then((user) => {
                if (type && type.toUpperCase() === 'SIGNUP') {
                    if (!user) {
                        return resolve();
                    }
                    return reject(USER_ALREADY_EXISTED);
                }
                if (!user) {
                    return reject(USER_NOT_EXISTED);
                }
                resolve(user);
            })
            .catch((err) => {
                console.info('query user err: ', err);
                if (type && type.toUpperCase() === 'SIGNUP') {
                    return resolve();
                }
                reject(USER_NOT_EXISTED);
            });
    });
};

//更新操作
exports.updateUser = function ( { query, populate = {}, valid={} }) {
    return new Promise((resolve, reject) => {
        Users
            .update(query, populate, valid)
            .then((res) => {
                console.info('user updated res: ', res);
                resolve(USER_UPDATE_SUCCESS);
            })
            .catch((err) => {
                console.info('user updated error: ', err);
                reject(USER_UPDATE_FAIL);
            });
    });
    
};

//比较密码
exports.comparePassword = function (user, password) {
    return new Promise((resolve, reject) => {
        user
            .comparePassword(password, function (isMatch) {
                if (!isMatch) {
                    return reject(USER_AUTH_FAIL);
                }
                //生成token
                const token = tokenManager.generateToken(user.username, password);
                delete user._doc.password;
                resolve({ user, token });
            });
    });
};



