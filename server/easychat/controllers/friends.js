const { Users, queryUser, updateUser } = require('../models/user');

const { USER_UPDATE_FAIL, USER_NOT_EXISTED } = require('../constant/status');

const GET_ALL_FRIENDS_FAIL = 'GET_ALL_FRIENDS_FAIL';

//获取所有好友列表
exports.index = (req, res) => {
    const { username } = req.body.user;
    const query = {
        username
    };
    queryUser({ query })
        .then(data => {
            const getFriends = getAllFriends(data.friends);
            const getLatestFriendRequest = getAllFriends(data.latestFriendRequest);
            return Promise.all([getFriends, getLatestFriendRequest]);
        })
        .then(data => {
            res.json({
                'status': 200,
                'message': '获取所有好友成功',
                friends: data[0],
                latestFriendRequest: data[1]
            });
        })
        .catch(err => {
            switch (err) {
                case GET_ALL_FRIENDS_FAIL: 
                    return res.json({
                        'status': 204,
                        'message': '获取好友失败'
                    });
                default: 
                    console.info('get all friends list error', err);
                    res.json({
                        'status': 204,
                        'message': '获取好友失败'
                    });
            }
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

    const query = {
        username: friendId
    };
    const populate =  { _id: 0, password: 0, latestFriendRequest: 0, latestMessages: 0 , friends: 0 };

    //查询用户
    queryUser({ query, populate })
        .then(friend => {
            res.json({
                'status': 200,
                'message': '查询用户信息成功',
                friend
            });
        })
        .catch(err => {
            switch (err) {
                case USER_NOT_EXISTED: 
                    return res.json({
                        'status': 204,
                        'message': '用户名不存在'
                    });       
                
                default: 
                    console.info('query friend error ', err);
            }
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

    const query = {
        username
    };
    const populate = {
        $push: {
            friends: friendId
        }
    };
    updateUser({ query, populate })
        .then(() => {
            const query = {
                username: friendId
            };
            const populate =  { _id: 0, password: 0, latestFriendRequest: 0, latestMessages: 0 , friends: 0 };
            //查询指定好友数据
            return queryUser({ query, populate });
        })
        .then(friend => {
            res.json({
                'status': 200,
                'message': '添加好友成功',
                friend
            });
        })
        .catch(err => {
            switch (err) {
                case USER_NOT_EXISTED: 
                    return res.json({
                        'status': 204,
                        'message': '用户名不存在'
                    });  
                case USER_UPDATE_FAIL: 
                    return res.json({
                        'status': 204,
                        'message': '添加好友失败'
                    });
                default: 
                    console.info('add friend error ', err);
            }
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
    const query ={
        username
    };
    const populate = {
        $pull: { friends:  friendId }
    }; 
    updateUser({ query, populate })
        .then(() => {
            return updateUser({ query: { username: friendId }, populate: {  $pull: { friends:  username } } });
        })
        .then(() => {
            res.json({
                'status': 200,
                'message': '删除好友成功'
            });
        }).catch(err => {
            switch (err) {
                case USER_UPDATE_FAIL: 
                    return res.json({
                        'status': 204,
                        'message': '删除好友失败'
                    });
                default:
                    console.info('delete friend error ', err);
            }
            
        });
};

//获取所有好友
function getAllFriends(friendsList) {
    return new Promise((resolve, reject) => {
        const populate =  { password: 0, latestFriendRequest: 0, latestMessages: 0 , friends: 0 };
        Users
            .find({}, populate)
            .where('username', friendsList)
            .exec((err, friends) => {
                if (err) {
                    return reject(GET_ALL_FRIENDS_FAIL);
                }
                resolve(friends);
            });
    });
}