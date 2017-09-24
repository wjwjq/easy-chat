const Users = require('../../models/user');

exports.getUser = function (req, res) {
    const { username } = req.body;
    Users.findOne({ username }, function (err, data) {
        if (err) {
            console.info(err);
        }
        if (data) {
            res.status(204).json({
                message: '用户名已被注册'
            });
        } else {
            res.status(200).json({
                message: '用户名可以使用'
            });
        }
    });
};