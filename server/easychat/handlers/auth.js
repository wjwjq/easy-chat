const Users = require('../../models/user');
const utils = require('../../utils/');
const validFunc = utils.validFunc;
const generatorToken = require('../../middlewares/tokenManager').generatorToken;

const generatedValid = '1234';
//登录
exports.signin = function (req, res) {
    const { username, password, valid } = req.body;
    if (username === '' || password === '') {
        return res.json({
            'status': 401,
            'message': '账号或密码错误'
        });
    }
    //验证是否正确
    if (generatedValid !== valid) {
        return res.json({
            'status': 401,
            'message': '验证码已过期或错误'
        });
    }
    //手机号格式验证
    if (!validFunc.phoneNumber(username)) {
        return res.json({
            'status': 401,
            'message': '用户名格式错误'
        });
    }

    //密码验证
    Users
        .findOne({
            username
        },{ 
            '_id': 0 
        }).then(function (user) {
            console.info(user);
            //密码验证
            user.comparePassword(password, function (isMatch) {
                if (!isMatch) {
                    return res.json({
                        'status': 401,
                        'message': '账号或密码不正确'
                    });
                }
                //生成token
                const token = generatorToken(username, password);
                delete user._doc.password;
                console.info('after', user);
                return res.json({
                    'status': 200,
                    'message': '登录成功',
                    user,
                    token
                });
            });
        }).catch(function (err) {
            if (err) {
                return res.json({
                    'status': 401,
                    'message': '账号或密码不正确'
                });
            }
        });
};

//注册
exports.signup = function (req, res) {
    const { username, password, valid, nickname, gender } = req.body;
    //验证是否正确
    if (generatedValid !== valid) {
        return res.json({
            'status': 401,
            'message': '验证码已过期或错误'
        });
    }
    //创建用户
    const user = new Users();
    Object.assign(user, {
        username,
        password,
        nickname,
        gender: gender === '男' ? 0 : 1
    });
    user.save((err) => {
        if (err) {
            return res.json({
                'status': 401,
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
    const { username } = req.body;
    console.info(username);
    res.json({
        'status': 200,
        'token': '123456aavss',
        'valid': '123456',
        'exprires': '300'
    });
};