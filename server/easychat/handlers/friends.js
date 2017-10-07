const User = require('../../models/user');

//获取所有好友列表
exports.index = (req, res) => {
    const { username } = req.body.user;
    User
        .findOne({
            username
        }, {
            'password': 0
        })
        .then((data) => {
            User
                .find({}, {
                    password: 0,
                    friends: 0,
                    recentContact: 0
                })
                .where('username', data.friends)
                .exec((err, friends) => {
                    if (err) {
                        return res.json({
                            'status': 404,
                            'message': '获取好友失败'
                        });
                    }
                    res.json({
                        'status': 200,
                        'friends': friends,
                        'message': '获取所有好友成功'
                    });
                });

        })
        .catch((err) => {
            console.info('获取好友失败', err);
            res.json({
                'status': 204,
                'message': '获取好友失败'
            });
        });
};

//查询指定好友的信息
exports.show = (req, res) => {
    const friendId = req.params.id;
    if (!friendId) {
        return res.json({
            'status': 400,
            'message': '请求格式错误'
        });
    }
    User
        .findOne({
            username: friendId
        }, {
            _id: 0,
            password: 0,
            friends: 0
        })
        .then((friend) => {
            if (!friend) {
                return res.json({
                    'status': 204,
                    'message': '用户名不存在'
                });
            }
            setTimeout(() => {
                res.json({
                    'status': 200,
                    'message': '查询用户信息成功',
                    friend
                });
            }, 1000);
        })
        .catch((err) => {
            if (err) {
                console.info(err);
            }
            res.json({
                'status': 204,
                'message': '用户名不存在'
            });
        });

};

//添加指定好友
exports.post = (req, res) => {
    const  friendId = req.params.id;
    const { username } = req.body.user;
    if (!friendId) {
        res.json({
            'status': 400,
            'message': '请求格式错误'
        });
    }
    User.update({
        username
    }, {
        $push: {
            friends: friendId
        }
    }).then((data) => {
        if (!data) {
            res.json({
                'status': 204,
                'message': '添加好友失败'
            });
        }
        User.findOne({
            username: friendId
        }, {
            _id: 0,
            password: 0,
            friends: 0
        })
            .then((friend) => {
                if (!friend) {
                    res.json({
                        'status': 204,
                        'message': '添加好友失败'
                    });
                }
                res.json({
                    'status': 200,
                    friend,
                    'message': '添加好友成功'
                });
            })
            .catch((err) => {
                console.info(err);
                res.json({
                    'status': 204,
                    'message': '添加好友失败'
                });
            });
    }).catch((err) => {
        console.info(err);
        res.json({
            'status': 204,
            'message': '添加好友失败'
        });
    });
};

//更新指定好友信息
exports.put = (req, res) => {
    res.json({
        'status': 200
    });
};

//删除指定好友
exports.delete = (req, res) => {
    const  friendId = req.params.id;
    const { username } = req.body.user;
    if (!friendId) {
        res.json({
            'status': 400,
            'message': '请求格式错误'
        });
    }
    User.update({
        username
    }, {
        $pull: { friends:  friendId }
    }).then((data) => {
        if (!data) {
            res.json({
                'status': 204,
                'message': '删除好友失败'
            });
        }
        res.json({
            'status': 200,
            'message': '删除好友成功'
        });
    }).catch((err) => {
        console.info(err);
        res.json({
            'status': 204,
            'message': '删除好友失败'
        });
    });
};