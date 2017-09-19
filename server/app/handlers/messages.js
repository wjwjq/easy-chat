//获取所有好友消息历史列表
exports.getMessages = function (req, res) {
    const data = [{
        'userId': '1',
        'msgs': [{
            'from': 1,
            'content': '哈哈哈，这是第一条内容,哈哈哈，这是第一条内容,哈哈哈，这是第一条内容,哈哈哈，这是第一条内容!',
            'publishTime': '2017-09-11 18:27:30'
        }, {
            'from': 0,
            'content': '哈哈哈，这是第二条内容',
            'publishTime': '2017-09-11 18:27:32'
        }]
    }, {
        'userId': '2',
        'msgs': [{
            'from': 1,
            'content': '哈哈哈，这是第二条内容',
            'publishTime': '2017-09-11 18:21:30'
        }]
    }, {
        'userId': '3',
        'msgs': [{
            'from': 1,
            'content': '哈哈哈，这是第三条内容',
            'publishTime': '2017-09-10 18:27:30'
        }]
    }, {
        'userId': '4',
        'msgs': [{
            'from': 1,
            'content': '哈哈哈，这是第4条内容',
            'publishTime': '2017-09-1 18:27:30'
        }]
    }];

    setTimeout(() => {
        res.json(data);
    }, 1000);
};

//查询指定好友的信息
exports.getMessage = function (req, res) {
    
};

//添加指定好友
exports.postMessage = function (req, res) {
    const data = {
        status: 'ok'
    };
    res.json(data);
};

//删除指定好友消息
exports.deleteMessage = function (req, res) {
    
};