const { parseToken, verify } = require('../middlewares/tokenManager');
const Chatroom = require('../models/chatroom');
const { queryUser, updateUser } = require('../models/user');

const {
    FRIEND_IS_OFFLINE,
    ADD_FRIEND_FAIL,
    ADD_FRIEND_SUCCESS,
    SAVE_FRIEND_FAIL,
    SAVE_FRIEND_SUCCESS,
    DELETE_FRIEND_FAIL,
    DELETE_FRIEND_SUCCESS,
    USER_UPDATE_LETESTMESSAGE_SUCCESS,
    USER_UPDATE_LETESTMESSAGE_FAIL
} = require('../constant/status');

//eventName
const POST_MESSAGE = 'POST_MESSAGE';
const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

const AUTHENTICATION_FAIL = 'AUTHENTICATION_FAIL';

const ADD_FRIEND_REQUEST = 'ADD_FRIEND_REQUEST';
const RECEIVE_ADD_FRIEND_REQUEST = 'RECEIVE_ADD_FRIEND_REQUEST';

const CONFIRM_ADD_FRIEND_REQUEST = 'CONFIRM_ADD_FRIEND_REQUEST';
const RECEIVE_CONFIRM_ADD_FRIEND_REQUEST = 'RECEIVE_CONFIRM_ADD_FRIEND_REQUEST';

const REFUSE_ADD_FRIEND_REQUEST = 'REFUSE_ADD_FRIEND_REQUEST';
const RECEIVE_REFUSE_ADD_FRIEND_REQUEST = 'RECEIVE_REFUSE_ADD_FRIEND_REQUEST';

const DELETE_FRIEND_REQUEST = 'DELETE_FRIEND_REQUEST';
const RECEIVE_DELETE_FRIEND_REQUEST = 'RECEIVE_DELETE_FRIEND_REQUEST';

//聊天主程序
module.exports = function eacychat(server) {

    //创建IO
    const io = require('socket.io')(server, {
        path: '/api/chat',
        serveClient: false,
        // below are engine.IO options
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: false
    });

    //建立连接
    io.use(authenticate)
        .on('connection', socket => {
            const currUsername = socket.handshake.user;
            console.info(`${currUsername} client is connecting`);

            //接收消息
            socket.on(POST_MESSAGE, chunk => handlePostMessage(socket, chunk));

            //添加好友通知, 好友id是必定存在的
            socket.on(ADD_FRIEND_REQUEST, chunk => handleAddFriendRequest(socket, currUsername, chunk));

            //确认添加好友
            socket.on(CONFIRM_ADD_FRIEND_REQUEST, chunk => haddleConfirmAddFriendRequest(socket, currUsername, chunk));
            
            //拒绝添加好友请求
            socket.on(REFUSE_ADD_FRIEND_REQUEST, chunk => haddleRefuseAddFriendRequest(socket, currUsername, chunk));
            
            //删除好友
            socket.on(DELETE_FRIEND_REQUEST, chunk => haddleDeleteFriendRequest(socket, currUsername, chunk));

            //认证失败
            socket.on(AUTHENTICATION_FAIL,() => handleAuthenticationFail(socket));

            socket.on('error', error => {
                console.info('socket error', error);
            });

            //断开连接
            socket.on('disconnecting',reason => handleDisconnecting(currUsername, reason));
        });
};

//身份认证中间件
function authenticate(socket, next) {
    parseToken(socket.handshake)
        .then(token => {
            return verify(token);
        })
        .then(username => {
            const doc = {
                username,
                socketId: socket.id
            };
            // console.info('successVerify',username);
            Chatroom.update({
                username
            }, doc, {
                upsert: true
            }, err => {
                if (err) {
                    Promise.reject(err);
                }
            });
            socket.handshake.user = username;
            next();
        })
        .catch(err => {
            console.info('AUTHENTICATION_FAIL error', err);
            next(new Error(AUTHENTICATION_FAIL));
        });
}

//认证失败
function handleAuthenticationFail(socket) {
    //认证失败
    socket.emit(AUTHENTICATION_FAIL, {
        status: 401,
        message: '身份认证失败， 请重新登录'
    });
}

//处理发送消息
function handlePostMessage(socket, chunk) {
    const friendId = chunk.data.to;
    isFriendOnline(friendId)
        .then(socketId => {
            socket.to(socketId).emit(RECEIVE_MESSAGE, chunk);
        })
        .catch(() => {
            //好友不在线 暂存消息
            return saveMessageToFriend({
                friendId,
                chunk
            });
        })
        .then(status => {
            console.info('delete message status', status);
        })
        .catch(err => {
            console.info('save message error', err);
        });
}

//处理好友请求
function handleAddFriendRequest(socket, currUsername, chunk) {
    const { friendId } = chunk;

    let targetSocketId;

    //判断被添加方是否在线
    isFriendOnline(friendId)
        .then(socketId => {
            //被添加好友在线,返回当前用户信息给被添加好友
            const query = {
                username: currUsername
            };
            const populate = {
                latestFriendRequest: 0,
                latestMessages: 0,
                friends: 0,
                password: 0
            };
            targetSocketId = socketId;
            return queryUser({
                query,
                populate
            });
        })
        .then(user => {
            socket.to(targetSocketId).emit(RECEIVE_ADD_FRIEND_REQUEST, {
                'status': 200,
                'message': '收到添加好友请求',
                friend: user
            });
        })
        .catch(() => {
            //好友不在线，缓存添加好友请求到好友latestFriendRequest
            return saveAddRequestToFriend({
                requestId: currUsername,
                beRequestedId: friendId
            });
        })
        .then(() => {
            //返回成功to添加方
            socket.emit(RECEIVE_ADD_FRIEND_REQUEST, {
                'status': 200,
                'message': '好友请求发送成功'
            });
        })
        .catch(err => {
            console.info('ADD_FRIEND_REQUEST error', err);
            socket.emit(RECEIVE_ADD_FRIEND_REQUEST, {
                'status': 200,
                'message': '好友请求发送失败'
            });
        });
}

//处理确认好友请求
function haddleConfirmAddFriendRequest(socket, currUsername, chunk) {
    const { friendId } = chunk;
    let targetSocketId;
    //1. 添加到双方好友列表中
    saveFriendIdToBoth({
        confirmId: currUsername,
        beConfirmedId: friendId
    })
        .then(() => isFriendOnline(friendId))
        .then(socketId => {

            const query = {
                username: currUsername
            };
            const populate = {
                latestFriendRequest: 0,
                latestMessages: 0,
                friends: 0,
                password: 0
            };
            targetSocketId = socketId;
            return queryUser({
                query,
                populate
            });

        }).then(data => {

            //2. 如果对方在线, 返回用户信息给请求方
            socket.emit(RECEIVE_CONFIRM_ADD_FRIEND_REQUEST, {
                status: 200,
                message: '好友添加成功',
                friendId
            });
            socket.to(targetSocketId).emit(RECEIVE_CONFIRM_ADD_FRIEND_REQUEST, {
                status: 200,
                friend: data,
                message: '好友添加成功'
            });
            updateUser({
                query: {
                    username: currUsername
                },
                populate: {
                    $pull: {
                        latestFriendRequest: friendId
                    }
                }
            });
        }).catch(err => {
            switch (err) {
                //添加失败
                case SAVE_FRIEND_FAIL:
                    console.info('确认添加请求失败');
                default:
                    console.info('confirm add friend request fail ', err);
            }
        });
}

//处理拒绝好友请求
function haddleRefuseAddFriendRequest(socket, currUsername, chunk) {
    const { friendId } = chunk;
    isFriendOnline(friendId)
        .then(socketId => {
            // 如果对方在线, 返回用户信息到请求方
            socket.emit(RECEIVE_REFUSE_ADD_FRIEND_REQUEST, {
                status: 200,
                friendId,
                message: '好友请求拒绝成功'
            });
            socket.to(socketId).emit(RECEIVE_REFUSE_ADD_FRIEND_REQUEST, {
                status: 200,
                friendId: currUsername,
                message: '好友请求已被拒绝'
            });
            //删除latestFriendRequest的对方id
            updateUser({
                query: {
                    username: currUsername
                },
                populate: {
                    $pull: {
                        latestFriendRequest: friendId
                    }
                }
            });
        }).catch(err => {
            switch (err) {
                //如果不在线,保存失败信息到请求方失败列表中
                case FRIEND_IS_OFFLINE:
                    //TODO
                default:
                    console.info('refuse add friend request fail ', err);
            }
        });
}

//删除好友
function haddleDeleteFriendRequest(socket, currUsername, chunk) {
    const { friendId } = chunk;

    deleteFriendIdToBoth({ deleteId: currUsername, beDeletedId: friendId })
        .then(() => isFriendOnline(friendId))
        .then(socketId => {
            // 如果对方在线, 返回用户信息到请求方
            socket.emit(RECEIVE_DELETE_FRIEND_REQUEST, {
                status: 200,
                friendId,
                message: '成功删除好友'
            });
            socket.to(socketId).emit(RECEIVE_DELETE_FRIEND_REQUEST, {
                status: 200,
                friendId: currUsername,
                message: '已被好友删除'
            });
        })
        .catch(err => {
            console.info('DELETE_FRIEND_REQUEST error', err);
            if (err !== FRIEND_IS_OFFLINE) {
                socket.emit(RECEIVE_DELETE_FRIEND_REQUEST, {
                    status: 400,
                    friendId,
                    message: '删除好友失败'
                });
            } else {
                socket.emit(RECEIVE_DELETE_FRIEND_REQUEST, {
                    status: 200,
                    friendId,
                    message: '成功删除好友'
                });
            }
        });
}

//处理断开连接
function handleDisconnecting(currUsername, reason) {
    Chatroom.remove({
        username: currUsername
    }, err => {
        if (err) console.info('diconnect Error ', err);
        console.info('client disconnected', reason);
    });
}

//检测好友当前是否在线， 在线返回好友socketId
function isFriendOnline(friendId) {
    return new Promise((resolve, reject) => {
        Chatroom.findOne({
            username: friendId
        }).then(onlineUser => {
            const {
                socketId
            } = onlineUser;
            if (!socketId) {
                return reject(FRIEND_IS_OFFLINE);
            }
            //用户在线，返回sockeID
            console.info(`friend ${friendId} is online, socketId: `, socketId);
            resolve(socketId);
        }).catch(err => {
            //聊天对象当前不在线, 将消息更新到该对象的最新聊天记录中，便于用户上线时获取
            console.info(`friend ${friendId} is offline`);
            if (err) {
                return reject(FRIEND_IS_OFFLINE);
            }
        });
    });
}

//暂存消息于好友消息中
function saveMessageToFriend({ friendId, chunk }) {
    return new Promise((resolve, reject) => {
        const query = {
            username: friendId
        };
        const populate = {
            $push: {
                latestMessages: chunk
            }
        };
        updateUser({
            query,
            populate
        })
            .then(data => {
                console.info('update latestMessages data', data);
                resolve(USER_UPDATE_LETESTMESSAGE_SUCCESS);
            }).catch(err => {
                console.info('update latestMessages err', err);
                reject(USER_UPDATE_LETESTMESSAGE_FAIL);
            });
    });
}

//暂存添加好友请求到被请求方请求列表, 以便被请求方上线后获取
function saveAddRequestToFriend({ requestId, beRequestedId }) {
    return new Promise((resolve, reject) => {
        const query = {
            username: beRequestedId
        };
        const populate = {
            $addToSet: {
                latestFriendRequest: requestId
            }
        };
        updateUser({
            query,
            populate
        })
            .then(data => {
                console.info('update latestFriendRequest data', data);
                resolve(ADD_FRIEND_SUCCESS);
            }).catch(err => {
                console.info('update latestFriendRequest err', err);
                reject(ADD_FRIEND_FAIL);
            });
    });
}

//确认添加对应好友Id到双方好友列表，建立好友关系
async function saveFriendIdToBoth({ confirmId, beConfirmedId }) {
    let r;
    try {
        //添加被确认方Id到确认方好友列表
        r = await saveFriendIdToFriendList(confirmId, beConfirmedId);
        //添加确认方Id到被确认方好友列表
        r = await saveFriendIdToFriendList(beConfirmedId, confirmId);
    } catch (err) {
        return Promise.reject(err);
    }
    return r;
}

//保存好友Id 到用户好友列表中
function saveFriendIdToFriendList(confirmId, beConfirmedId) {
    return new Promise((resolve, reject) => {
        const query = {
            username: confirmId
        };
        const populate = {
            $addToSet: {
                friends: beConfirmedId
            }
        };
        updateUser({
            query,
            populate
        })
            .then(data => {
                console.info('SAVE FriendList data', data);
                resolve(SAVE_FRIEND_SUCCESS);
            }).catch(err => {
                console.info('SAVE FriendList err', err);
                console.info(`user ${confirmId} add friend ${beConfirmedId} fail`, err);
                reject(SAVE_FRIEND_FAIL);
            });
    });
}

//删除双方好友ID
async function deleteFriendIdToBoth({ deleteId, beDeletedId }) {
    let r;
    try {
        //删除自己好友列表中对方好友ID
        r = await deleteFriendIdToFriendList(deleteId, beDeletedId);
        //删除对方好友列表中当前用户ID
        r = await deleteFriendIdToFriendList(beDeletedId, deleteId);
    } catch (err) {
        return Promise.reject(err);
    }
    return r;
}

//删除好友Id
function deleteFriendIdToFriendList( deleteId, beDeletedId) {
    return new Promise((resolve, reject) => {
        const query = {
            username: deleteId
        };
        const populate = {
            $pull: {
                friends: beDeletedId
            }
        };
        updateUser({
            query,
            populate
        })
            .then(data => {
                console.info('delete FriendList data', data);
                resolve(DELETE_FRIEND_SUCCESS);
            }).catch(err => {
                console.info('delete FriendList err', err);
                console.info(`user ${confirmId} delete friend ${beConfirmedId} fail`, err);
                reject(DELETE_FRIEND_FAIL);
            });
    });
}