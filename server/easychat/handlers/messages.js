//获取所有好友消息历史列表
exports.getMessages = function (req, res) {
    const data = [
        {
            'friendId': '1',
            'msgs': [{
                'from': '1',
                'to': '59c262677e18a92adc9d93aa',
                'content': '哈哈哈，这是第一条内容,哈哈哈，这是第一条内容,哈哈哈，这是第一条内容,哈哈哈，这是第一条内容!',
                'publishTime': '2017-09-11 18:27:30'
            }, {
                'from': '59c262677e18a92adc9d93aa',
                'to': '1',
                'content': '哈哈哈，这是第二条内容',
                'publishTime': '2017-09-11 18:27:32'
            }]
        },
        {
            'friendId': '2',
            'msgs': [ {
                'from': '59c262677e18a92adc9d93aa',
                'to': '2',
                'content': '哈哈哈，这是第二条内容',
                'publishTime': '2017-09-11 18:27:32'
            },{
                'from': '2',
                'to': '59c262677e18a92adc9d93aa',
                'content': '哈哈哈，这是第二条内容',
                'publishTime': '2017-09-11 18:21:30'
            }]
        },
        {
            'friendId': '3',
            'msgs': [{
                'from': '3',
                'to': '59c262677e18a92adc9d93aa',
                'content': '哈哈哈，这是第三条内容',
                'publishTime': '2017-09-10 18:27:30'
            }]
        },
        {
            'friendId': '4',
            'msgs': [{
                'from': '4',
                'to': '59c262677e18a92adc9d93aa',
                'content': '哈哈哈，这是第4条内容',
                'publishTime': '2017-09-1 18:27:30'
            }]
        }
    ];


    setTimeout(() => {
        res.status(200).json(data);
    }, 1000);
};

//查询指定好友的信息
exports.getMessage = function (req, res) {

};

//新建好友消息
exports.postMessage = function (req, res) {
    res.json({});
};

//更新好友消息
exports.putMessage = function (req, res) {
    res.json({});
};

//删除指定好友消息
exports.deleteMessage = function (req, res) {
    res.json({});
};