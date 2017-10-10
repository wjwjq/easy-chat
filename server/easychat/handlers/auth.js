const Users = require('../../models/user');
const utils = require('../../utils/');
const validFunc = utils.validFunc;
const generatorToken = require('../../middlewares/tokenManager').generatorToken;

const VerifyCode = require('../../models/verifycode');
const sendSMS = require('./SMS').sendSMS;

const SEND_CODE_FAIL = 'SEND_CODE_FAIL';
const SAVE_CODE_FAIL = 'SAVE_CODE_FAIL';
const SAVE_CODE_SUCCESS = 'SAVE_CODE_SUCCESS';
const CODE_EXPIRED = 'CODE_EXPIRED';
const CODE_NOT_FIND = 'CODE_NOT_FIND';
const CODE_NOT_EQUAL = 'CODE_NOT_EQUAL';
const CODE_VALID_SUCCESS = 'CODE_VALID_SUCCESS';
const USER_NOT_EXISTED = 'USER_NOT_EXISTED';
const USER_ALREADY_EXISTED = 'USER_ALREADY_EXISTED';
const USER_AUTH_FAIL = 'USER_AUTH_FAIL';
const USER_AUTH_SUCCESS = 'USER_AUTH_SUCCESS';


//移除存储的验证码
function removeVerifyCode(username) {
    VerifyCode.remove({
        username
    }, function (err) {
        console.info('remove VerifyCode err', err);
    });
}

//保存验证码
function saveVerifyCode(username, code) {
    return new Promise((resolve, reject) => {
        const condition = { username };
        const doc = { username, code, expires: Date.now() / 1000 + 60 * 30 };
        const valid = { upsert: true };
        const callback = (err) => {
            if (err) {
                console.info('save code err', err);
                return reject(SAVE_CODE_FAIL);
            }
            resolve(SAVE_CODE_SUCCESS);
        };
        VerifyCode.update(condition, doc, valid, callback);
    });
}

//获取验证码
function getVerifyCode(username) {
    return new Promise((resolve, reject) => {
        VerifyCode
            .findOne({
                username
            })
            .then((doc) => {
                console.info('doc', doc);
                if (doc['expires'] < Date.now() / 1000)
                    return reject(CODE_EXPIRED);
                resolve(doc.code);
            })
            .catch((err) =>   { console.info(err);reject(CODE_NOT_FIND) ; });
    });
}

//验证码比较
function compareVerifyCode(codeInDB, code) {
    return new Promise((resolve, reject) => {
        if (codeInDB === code) {
            return resolve(CODE_VALID_SUCCESS);
        }
        reject(CODE_NOT_EQUAL);
    });
}

//验证验证码
async function validVerifyCode(username, code) {
    let r;
    try {
        r = await getVerifyCode(username);
        r = await compareVerifyCode(r, code);
    } catch (err) {
        return Promise.reject(err);
    }
    return r;
}



/**
 * 查询用户是否存在
 *  说明： 如果type === signup, 那么表示当前查询操作为注册发出,此时若无此用户,将返回成功
 *        如果type 为其它值，那么将返回查询成功的用户信息
 * @param options{
 *     type {String} 功能
 *     username {String}  用户名
 *     [populate={}] {any}  过滤参数
 * }
 * @returns 
 */
function queryUser(options) {
    const {
        type,
        username,
        populate = {}
    } = options;
    return new Promise((resolve, reject) => {
        Users.findOne({
            username
        }, populate)
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
                if (funcType && funcType.toUpperCase() === 'SIGNUP') {
                    return resolve(USER_NOT_EXISTED);
                }
                reject(USER_NOT_EXISTED);
            });
    });
}

//比较密码
function comparePassword(user, password) {
    return new Promise((resolve, reject) => {
        user.comparePassword(password, function (isMatch) {
            if (!isMatch) {
                return reject(USER_AUTH_FAIL);
            }
            console.info(user.username);
            //生成token
            const token = generatorToken(user.username, password);
            delete user._doc.password;
            resolve({
                user,
                token
            });
        });
    });
}

//创建用户
function createUser(userParams) {
    return new Promise((resolve, reject) => {
        const user = new Users(userParams);
        user.save((err) => {
            if (err) {
                return reject(USER_ALREADY_EXISTED);
            }
            resolve(USER_AUTH_SUCCESS);
        });
    });
}


//登录
exports.signin = function (req, res) {
    const {
        username,
        password,
        valid
    } = req.body;

    if (username === '' || password === '') {
        return res.json({
            'status': 401,
            'message': '账号或密码错误'
        });
    }

    //手机号格式验证
    if (!validFunc.phoneNumber(username)) {
        return res.json({
            'status': 401,
            'message': '手机号格式错误'
        });
    }


    //查询用户是否存在
    queryUser({
        username
    })
        .then(() => {
            //验证验证码是否正确
            return validVerifyCode(username, valid);
        })
        .then(() => {
            //查询用户信息
            const query = {
                username,
                populate: {
                    'address': 1,
                    'avatarUrl': 1,
                    'gender': 1,
                    'nickname': 1,
                    'order': 1,
                    'remark': 1,
                    'username': 1,
                    'password': 1
                }
            };
            return queryUser(query);
        })
        .then((user) => {
            //密码验证
            return comparePassword(user, password);
        })
        .then((data) => {
            removeVerifyCode(username);
            res.json({
                'status': 200,
                'message': '登录成功',
                ...data
            });
        })
        .catch((err) => {
            //错误处理
            switch (err) {
                case CODE_EXPIRED:
                    return res.json({
                        'status': 401,
                        'message': '验证码已过期'
                    });
                case CODE_NOT_FIND:
                    return res.json({
                        'status': 401,
                        'message': '验证码不存在'
                    });
                case CODE_NOT_EQUAL:
                    return res.json({
                        'status': 401,
                        'message': '验证码错误'
                    });
                case USER_NOT_EXISTED:
                    return res.json({
                        'status': 401,
                        'message': '用户名不存在'
                    });
                case USER_AUTH_FAIL:
                    return res.json({
                        'status': 401,
                        'message': '账号或密码不正确'
                    });
                default:
                    console.info('singin err: ', err);
            }
        });
};

//注册
exports.signup = function (req, res) {
    const {
        username,
        password,
        valid,
        nickname,
        gender
    } = req.body;

    //手机号格式验证
    if (!validFunc.phoneNumber(username)) {
        return res.json({
            'status': 401,
            'message': '手机号格式错误'
        });
    }
    queryUser({
        username,
        type: 'signup'
    }).then(() => {
        return validVerifyCode(username, valid);
    })
        .then(() => {
            //创建用户
            return createUser({
                username,
                password,
                nickname,
                gender: gender === '男' ? 0 : 1
            });
        })
        .then(() => {
            //注册成功
            res.json({
                'status': 200,
                'message': '注册成功'
            });
        })
        .catch((err) => {
            //错误处理
            switch (err) {
                case CODE_EXPIRED:
                    return res.json({
                        'status': 401,
                        'message': '验证码已过期'
                    });
                case CODE_NOT_FIND:
                    return res.json({
                        'status': 401,
                        'message': '验证码错误'
                    });
                case CODE_NOT_EQUAL:
                    return res.json({
                        'status': 401,
                        'message': '验证码错误'
                    });
                case USER_ALREADY_EXISTED:
                    return res.json({
                        'status': 401,
                        'message': '用户名已存在'
                    });
                default:
                    console.info('singin err: ', err);
            }
        });
};

//验证码
exports.valid = function (req, res) {
    const {
        username,
        type
    } = req.body;
    if (!username) {
        return res.json({
            'status': 400,
            'message': '请求参数错误'
        });
    }
    const code = Math.random().toString().slice(-4);
    //查询用户是否存在
    queryUser({
        type,
        username
    })
        .then(() => {
            return sendSMS({
                phoneNumber: username,
                code
            });
        }).then((result) => {
            console.info(result);
            if (result.Code.toUpperCase() !== 'OK') {
                throw new Error('发送验证码失败');
            }
            //存储验证码
            return saveVerifyCode(username, code);
        })
        .then((status) => {
            //发送和存储验证码成功
            if (status === SAVE_CODE_SUCCESS) {
                res.json({
                    'status': 200,
                    'message': '验证码已发送,请注意查收手机短信'
                });
            }
        })
        .catch((err) => {
            switch (err) {
                case USER_ALREADY_EXISTED:
                    return res.json({
                        'status': 204,
                        'message': '手机号已存在, 请更换手机号'
                    });
                case USER_NOT_EXISTED:
                    return res.json({
                        'status': 401,
                        'message': '无此手机号,请更换手机号或注册'
                    });
                case SAVE_CODE_FAIL:
                    return res.json({
                        'status': 500,
                        'message': '发送验证码失败,请稍后重试'
                    });
                case SEND_CODE_FAIL:
                    return res.json({
                        'status': 500,
                        'message': '服务器正忙,请稍后重试'
                    });
                default:
                    console.info('err', err);
            }
        });
};