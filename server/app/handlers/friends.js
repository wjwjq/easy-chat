//获取所有好友列表
exports.getFriends = function (req, res) {
    const data = [{
        'address': '四川 成都',
        'avatarUrl': '',
        'gender': 0,
        'nickname': 'test A-1',
        'order': 'A',
        'remark': '风',
        'telephone': '18990655830',
        'userId': '1',
        'username': '18990655830'
    }, {
        'address': '',
        'avatarUrl': '/images/avatar.png',
        'gender': 1,
        'nickname': 'test A-2',
        'order': 'B',
        'remark': '',
        'telephone': '',
        'userId': '2',
        'username': 'wjwjq456@qq.com'
    }, {
        'address': '',
        'avatarUrl': '',
        'gender': 1,
        'nickname': 'test B-1',
        'order': 'A',
        'remark': '',
        'telephone': '',
        'userId': '3',
        'username': 'wjq@eagle.com'
    }, {
        'address': '',
        'avatarUrl': '/images/avatar.png',
        'gender': 0,
        'nickname': 'test B-2',
        'order': 'B',
        'remark': '',
        'telephone': '',
        'userId': '4',
        'username': 'eagleagle@qq.com'
    }];

    setTimeout(() => {
        res.json(data);
    }, 300);
};

//查询指定好友的信息
exports.getFriend = function (req, res) {
    
};

//添加指定好友
exports.postFriend = function (req, res) {
    
};

//更新指定好友信息
exports.putFriend = function (req, res) {
    
};

//删除指定好友
exports.deleteFriend = function (req, res) {
    
};