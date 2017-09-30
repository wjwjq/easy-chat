const Users = require('../../models/user');

exports.index = (req, res) => {

};

exports.show = (req, res) => {
    const { username } = req.body;
    Users.findOne({ username }, function (err, data) {
        if (err) {
            console.info(err);
        }
        if (data) {
            res.json({
                'status': 204,
                'message': '用户名已被注册'
            });
        } else {
            res.json({
                'status': 200,
                'message': '用户名可以使用'
            });
        }
    });
};

exports.post = (req, res) => {
    res.json({
        'status': 200
    });
};

exports.put = (req, res) => {
    res.json({
        'status': 200
    });
};

exports.delete = (req, res) => {
    res.json({
        'status': 200
    });
};

exports.logout = (req, res) => {
    res.json({
        'status': 200
    });
};