const { Users, queryUser } = require('../models/user');

//获取所有好友消息历史列表
exports.index = (req, res) => {
    const {
        username
    } = req.body.user;

    const query = {
        username
    };
    const populate = {
        latestMessages: 1,
        _id: 0
    };

    queryUser({ query, populate })
        .then(doc => {
            const { latestMessages } = doc;
            return dealLatestMessage(latestMessages);
        })
        .then(messages => {
            //清空latestMessages数据
            Users.update({
                username
            },{
                $set: { latestMessages: [] }
            },err => {
                console.info('delete latest msessage err', err);
            });

            res.json({
                'status': 200,
                'message': '获取好友最新消息记录成功',
                messages
            });
        }).catch(err => {
            if (err) {
                res.json({
                    'status': 204,
                    'message': '获取好友最新消息记录失败'
                });
            }
        });
};

//查询指定好友的信息
exports.show = (req, res) => {
    const {
        username
    } = req.body.user;
};

//新建好友消息
exports.post = (req, res) => {
    const {
        username
    } = req.body.user;
    res.json({
        'status': 200
    });
};

//更新好友消息
exports.put = (req, res) => {
    const {
        username
    } = req.body.user;
    res.json({
        'status': 200
    });
};

//删除指定好友消息
exports.delete = (req, res) => {
    const {
        username
    } = req.body.user;
    res.json({
        'status': 200
    });
};

//处理最新消息记录
function dealLatestMessage(latestMessages = []) {
    return new Promise(resolve => {
        let messages = {};
        if (latestMessages) {
            for (let i = 0; i < latestMessages.length; i++) {
                const friendId = latestMessages[i].friendId;
                if (messages[friendId]) {
                    messages[friendId].push(latestMessages[i].data);
                } else {
                    messages[friendId] = [latestMessages[i].data];
                }
            }
        }
        resolve(messages);
    });
}