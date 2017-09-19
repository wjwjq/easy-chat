const valid = '1234';
const utils = require('../../utils');

const formatUserData = utils.formatUserData;
const validFunc = utils.validFunc;

//登录
exports.signin =  function (req, res) {
    const { username, password } = req.body.data.user;
    const postValid = req.body.data.valid;
    //验证是否正确
    if (postValid === valid) {
        //手机号格式验证
        if (validFunc.phoneNumber(username)) {
            const Users = dbHelper.getModel('users');
            Users.findOne({ username },function (err, user) {
                let data;
                if (err) {
                    data = {
                        'status': 204,
                        'message': '账号或密码不正确'
                    };
                } 
                //密码验证
                if (user && user.password === password) {
                    data = {
                        'status': 200,
                        'message': '登录成功',
                        'token': 'aaa1234',
                        'user': formatUserData(user._doc, 'password')
                    };
                } else {
                    data = {
                        'status': 204,
                        'message': '账号或密码不正确'
                    };
                }
                res.send(data);
            });
        } else {
            res.send({
                'status': 204,
                'message': '用户名格式错误'
            });
        }
    } else {
        res.send({
            'status': 204,
            'message': '验证码已过期或错误'
        });
    }
};

//注册
exports.signup = function (req, res) {
    const userInfo = req.body.data.user;
    const postValid = req.body.data.valid;
    //验证是否正确
    if (postValid === valid) {
        const Users = dbHelper.getModel('users');
        const user = new Users();
        Object.assign(user, userInfo);
        user.save((err, msg) => {
            console.info(msg);
            let data;
            if (err) {
                data = {
                    'status': 204,
                    'message': '用户名已存在'
                };
            } else {
                data = {
                    'status': 200,
                    'message': '注册成功'
                };
            }
            res.send(data);
        });
    } else {
        res.send({
            'status': 204,
            'message': '验证码已过期或错误'
        });
    }
};

//验证码
exports.valid = function (req, res) {
    const data = {
        'status': 200,
        'token': '123456aavss',
        'valid': '123456',
        'exprires': '300'
    };
    res.send(data);
};