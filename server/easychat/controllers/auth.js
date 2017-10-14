//引入Model USERS操作方法
const { createUser, comparePassword, queryUser } = require('../models/user');

//引入Model VerifyCode操作方法
const { saveVerifyCode, validVerifyCode , removeVerifyCode } = require('../models/verifyCode');

//引入发送短信接口
const sendSMS = require('./SMS').sendSMS;

//引入验证工具
const validFunc = require('../../utils/').validFunc;

//引入状态常量
const {
    CODE_EXPIRED, 
    CODE_NOT_EQUAL, 
    CODE_NOT_FIND, 
    SEND_CODE_FAIL, 
    SAVE_CODE_FAIL, 
    SAVE_CODE_SUCCESS,
    USER_NOT_EXISTED,
    USER_ALREADY_EXISTED,
    USER_AUTH_FAIL
}= require('../constant/status');

const MAN = '男';

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

    const query = { username };
    //查询用户是否存在
    queryUser({ query })
        .then(() => {
            //验证验证码是否正确
            return validVerifyCode(username, valid);
        })
        .then(() => {
            //查询用户信息
            const query = {
                username
            };
            const populate =  { latestFriendRequest: 0, latestMessages: 0 , friends: 0 };
            return queryUser({ query, populate });
        })
        .then(user => {
            //密码验证
            return comparePassword(user, password);
        })
        .then(data => {
            removeVerifyCode(username);
            res.json({
                'status': 200,
                'message': '登录成功',
                ...data
            });
        })
        .catch(err => {
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
                        'message': '请先获取验证码'
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
                    console.info('sign in err: ', err);
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

    const query = {
        username
    };
    const type = 'signup';
    //查询用户是否存在
    queryUser({ query, type })
        .then(() => {
            //验证验证码是否正确
            return validVerifyCode(username, valid);
        })
        .then(() => {
            //创建用户
            return createUser({
                username,
                password,
                nickname,
                gender: gender === MAN ? 0 : 1
            });
        })
        .then(() => {
            //注册成功
            res.json({
                'status': 200,
                'message': '注册成功'
            });
        })
        .catch(err => {
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
                        'message': '请先获取验证码'
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
                    console.info('sign up err: ', err);
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
    const code = Math.floor(Math.random() * (999999 - 100000) + 100000).toString();
    
    const query = {
        username
    };

    //查询用户是否存在
    queryUser({
        type,
        query
    })
        .then(() => {
            //存储验证码
            return saveVerifyCode(username, code);
        })
        .then(status => {
            //存储验证码成功
            if (status === SAVE_CODE_SUCCESS) {
                //发送验证码
                return sendSMS({
                    phoneNumber: username,
                    code
                });
            }
        }).then(result => {
            //发送验证码失败
            if (result.Code.toUpperCase() !== 'OK') {
                removeVerifyCode(username);
                return Promise.reject(SEND_CODE_FAIL);
            }
            //发送验证码成功
            res.json({
                'status': 200,
                'message': '验证码已发送,请注意查收手机短信'
            });
        })
        .catch(err => {
            switch (err) {
                case USER_ALREADY_EXISTED:
                    return res.json({
                        'status': 401,
                        'message': '手机号已存在, 请更换手机号'
                    });
                case USER_NOT_EXISTED:
                    return res.json({
                        'status': 401,
                        'message': '手机号不存在, 请更换手机号或注册'
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
                    console.info('get verify code err', err);
            }
        });
};