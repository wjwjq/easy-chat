//获取所有好友消息历史列表
exports.index = (req, res) => {
    const { username } = req.body.user;
    setTimeout(() => {
        res.json({
            'status': 200,
            'messages': [
                // {  
                //     username: '18990655830',
                //     msgs:  [{ from: '18990655830', to: '18990655830', content: '32131', publishTime: '2017-09-25 22:08:49' }]
                // },
                // {  
                //     username: '18990655839',
                //     msgs:  [{ from: '18990655839', to: '18990655830', content: '32131', publishTime: '2017-09-25 22:08:49' }]
                // }
            ]
        });
    }, 1000);
};

//查询指定好友的信息
exports.show = (req, res) => {
    const { username } = req.body.user;
};

//新建好友消息
exports.post = (req, res) => {
    const { username } = req.body.user;
    res.json({
        'status': 200
    });
};

//更新好友消息
exports.put = (req, res) => {
    const { username } = req.body.user;
    res.json({
        'status': 200        
    });
};

//删除指定好友消息
exports.delete = (req, res) => {
    const { username } = req.body.user;
    res.json({
        'status': 200
    });
};