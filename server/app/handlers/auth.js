const valid = '1234';
//注册
exports.signin =  function (req, res) {
    const userInfo = req.body.data.user;
    const postValid = req.body.data.valid;
    if (postValid === valid) {
        const Users = dbHelper.getModel('users');
        Users.findOne({ username: userInfo.username },function (err, user) {
            let data;
            if (err) {
                data = {
                    'status': 'error',
                    'error': '登录失败'
                };
            } 
            if (user && user.password === userInfo.password) {
                data = {
                    'status': 'ok',
                    'error': '',
                    'token': 'aaa1234'
                };
            } else {
                data = {
                    'status': 'error',
                    'error': '账号或密码错误'
                };
            }
            res.send(data);
        });
    } else {
        res.send({
            'status': 'error',
            'error': '验证码已过期或错误'
        });
    }
};

//登录
exports.signup = function (req, res) {
    const userInfo = req.body.data.user;
    const postValid = req.body.data.valid;
    if (postValid === valid) {
        const Users = dbHelper.getModel('users');
        const user = new Users();
        Object.assign(user, userInfo);
        user.save((err, msg) => {
            console.info(msg);
            let data;
            if (err) {
                data = {
                    'status': 'error',
                    'error': '注册失败'
                };
            } else {
                data = {
                    'status': 'ok',
                    'error': ''
                };
            }
            res.send(data);
        });
    } else {
        res.send({
            'status': 'error',
            'error': '验证码已过期或错误'
        });
    }
};

//验证码
exports.valid = function (req, res) {
    const data = {
        'status': 'ok',
        'token': '123456aavss',
        'valid': '123456',
        'exprires': '300'
    };
    res.send(data);
};