const Users = require('../../models/user');
const jwt = require('jsonwebtoken');
const utils = require('../../utils/');
const formatUserData = utils.formatUserData;
const validFunc = utils.validFunc;
const credentials = require('../../credentials');
const valid = '1234';
//登录
exports.signin = function (req, res) {
    const {
        username,
        password
    } = req.body.data.user;
    const postValid = req.body.data.valid;

    if (username === '' || password === '') {
        return res.json({
            'status': 204,
            'message': '账号或密码错误'
        });
    }
    //验证是否正确
    if (postValid !== valid) {
        return res.json({
            'status': 204,
            'message': '验证码已过期或错误'
        });
    }
    //手机号格式验证
    if (!validFunc.phoneNumber(username)) {
        return res.json({
            'status': 204,
            'message': '用户名格式错误'
        });
    }

    //密码验证
    Users.findOne({
        username
    }, function (err, user) {
        if (err) {
            return res.json({
                'status': 204,
                'message': '账号或密码不正确'
            });
        }
        //密码验证
        user.comparePassword(password, function (isMatch) {
            if (!isMatch) {
                return res.json({
                    'status': 204,
                    'message': '账号或密码不正确'
                });
            }
            //生成token
            const token = jwt.sign({
                username,
                password,
                iat: Math.floor(Date.now() / 1000) - 30
            }, credentials.token.secret, {
                expiresIn: credentials.token.expires
            });
            
            console.info('genrator', token);
            return res.json({
                'status': 200,
                'message': '登录成功',
                'user': formatUserData(user._doc, 'password'),
                token
            });
        });
    });
};

//注册
exports.signup = function (req, res) {
    const userInfo = req.body.data.user;
    const postValid = req.body.data.valid;
    //验证是否正确
    if (postValid !== valid) {
        return res.json({
            'status': 204,
            'message': '验证码已过期或错误'
        });
    }
    //创建用户
    const user = new Users();
    Object.assign(user, userInfo);
    user.save((err, msg) => {
        console.info(msg);
        if (err) {
            return res.json({
                'status': 204,
                'message': '用户名已存在'
            });
        }
        return res.json({
            'status': 200,
            'message': '注册成功'
        });
    });
};

//验证码
exports.valid = function (req, res) {
    res.json({
        'status': 200,
        'token': '123456aavss',
        'valid': '123456',
        'exprires': '300'
    });
};