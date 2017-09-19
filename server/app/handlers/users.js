
exports.getUser = function (req, res) {
    const { username } = req.body;
    const Users = dbHelper.getModel('users');
    Users.findOne({ username }, function (err, data) {
        if (err) {
            console.info(err);
        }
        if (data) {
            res.json({
                status: 204,
                message: '用户名已被注册'
            });
        } else {
            res.json({
                status: 200,
                message: '用户名可以使用'
            });
        }
    });
};