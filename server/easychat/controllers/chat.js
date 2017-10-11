const { parseToken, verify } = require('../middlewares/tokenManager');
const Chatroom = require('../models/chatroom');
const { queryUser, updateUser } = require('../models/user');

const { 
    POST_MESSAGE,
    RECEIVE_MESSAGE,
    ADD_FRIEND_REQUEST,
    RECEIVE_ADD_FRIEND_REQUEST,
    CONFIRM_ADD_FRIEND_REQUEST,
    RECEIVE_CONFIRM_ADD_FRIEND_REQUEST,
    REFUSE_ADD_FRIEND_REQUEST,
    RECEIVE_REFUSE_ADD_FRIEND_REQUEST,
    TOKEN_AUTHENTICATION_FAIL,
    FRIEND_IS_OFFLINE,
    ADD_FRIEND_FAIL,
    ADD_FRIEND_SUCCESS,
    SAVE_FRIEND_FAIL,
    SAVE_FRIEND_SUCCESS,
    USER_NOT_EXISTED,
    USER_UPDATE_LETESTMESSAGE_SUCCESS,
    USER_UPDATE_LETESTMESSAGE_FAIL
} = require('../constant/status');

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

    const authFailRes = {
        status: 401,
        message: '身份认证失败， 请重新登录'
    };
    //token authentication middleware
    const authentication = (socket, next) => {
        parseToken(socket.handshake)
            .then((token) => {
                return verify(token);
            })
            .then((username) => {
                const doc = {
                    username,
                    socketId: socket.id
                };
                console.info('successVerify',username);
                Chatroom.update({ username }, doc, { upsert: true }, (err) => {
                    if (err) {
                        Promise.reject(err);
                    }
                });
                socket.handshake.user = username;
                next();
            })
            .catch((err) => {
                //认证失败
                console.info('chating authentication error', err);
                socket.emit(TOKEN_AUTHENTICATION_FAIL, authFailRes);
                next(new Error('Authentication error'));
            });
    };

    //建立连接
    io.use(authentication)
        .on('connection', (socket) => {
            const currUsername = socket.handshake.user;
            console.info(`${currUsername} client is connecting`);
           
            //接收消息
            socket.on(POST_MESSAGE, (chunk) => {
                const friendId = chunk.data.to;
                isFriendOnline(friendId)
                    .then((socketId) => {
                        console.info(`${socketId} chunk `, chunk);
                        //转发消息
                        socket.to(socketId).emit(RECEIVE_MESSAGE, chunk);
                    })
                    .catch(() => {
                        //好友不在线 暂存消息
                        return saveMessageToFriend({ friendId, chunk });
                    })
                    .then((status) => { console.info('save message status', status) ; })
                    .catch((err) => { console.info('save message error', err); });
            });

            //添加好友通知, 好友id是必定存在的
            socket.on(ADD_FRIEND_REQUEST, (chunk) => {
                const friendId = chunk.friendId;
                isFriendOnline(friendId)
                    .then((socketId) => {
                        //被添加好友在线,返回当前用户信息给被添加好友
                        queryUser();
                        socket.to(socketId).emit(RECEIVE_ADD_FRIEND_REQUEST, chunk);
                    })
                    .catch(() => {
                        //好友不在线，缓存添加好友请求到好友latestFriendRequest
                        saveAddRequestToFriend({ currUsername, friendId });
                    });
            });

            //确认添加好友
            socket.on(CONFIRM_ADD_FRIEND_REQUEST, (chunk) => {
                const friendId = chunk.friendId;
                //1. 添加到双方好友列表中
                saveFriendIdToBoth({ currUsername, friendId })
                    .then(() =>  isFriendOnline(friendId))
                    .then((socketId) => {
                    //2. 如果对方在线, 返回用户信息给请求方
                        socket.to(socketId).emit(RECEIVE_CONFIRM_ADD_FRIEND_REQUEST, chunk);
                    }).catch((err) => {
                        switch (err) {
                        //如果不在线,添加被请求好友Id到请求方好友列表
                            case FRIEND_IS_OFFLINE: 
                                return saveFriendIdToBoth({  currUsername, friendId });
                                //添加失败
                            case SAVE_FRIEND_FAIL: 
                                console.info('确认添加请求失败');
                            default:
                                console.info('confirm add friend request fail ', err);
                        }
                    });
            });

            //拒绝添加好友请求
            socket.on(REFUSE_ADD_FRIEND_REQUEST, (chunk) => {
                const friendId = chunk.friendId;
                isFriendOnline(friendId)
                    .then((socketId) => {
                    // 如果对方在线, 返回用户信息到请求方
                        socket.to(socketId).emit(RECEIVE_REFUSE_ADD_FRIEND_REQUEST, chunk);
                    }).catch((err) => {
                        switch (err) {
                        //如果不在线,保存失败信息到请求方失败列表中
                            case FRIEND_IS_OFFLINE: 
                            //TODO
                            default:
                                console.info('refuse add friend request fail ', err);
                        }
                    });
            });
      
            //断开连接
            socket.on('disconnecting', (reason) => {
                Chatroom.remove({
                    username: currUsername
                }, (err) => {
                    if (err) console.info('diconnect Error ', err);
                    console.info('client disconnected', reason);
                });
            });
        });
};


//检测好友当前是否在线， 在线返回好友socketId
function isFriendOnline(friendId) {
    return new Promise((resolve, reject) => {
        Chatroom.findOne({
            username: friendId
        }).then((onlineUser) => {
            const { socketId } = onlineUser;
            if (!socketId) {
                return reject(FRIEND_IS_OFFLINE);
            }
            //用户在线，返回sockeID
            console.info(`friend ${friendId} is online, socketId: `, socketId);
            resolve(socketId);
        }).catch((err) => {
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
        updateUser({ query, populate })
            .then((data) => {
                console.info('update latestMessages data', data);
                resolve(USER_UPDATE_LETESTMESSAGE_SUCCESS);
            }).catch((err) => {
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
            $push: {
                latestFriendRequest: requestId
            }
        };
        updateUser({ query, populate })
            .then((data) => {
                console.info('update latestFriendRequest data', data);
                resolve(ADD_FRIEND_SUCCESS);
            }).catch((err) => {
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
function saveFriendIdToFriendList(confirmId, beConfirmedId ) {
    return new Promise((resolve, reject) => {
        const query = {
            username: confirmId
        };
        const populate = {
            $push: {
                latestFriendRequest: beConfirmedId
            }
        };
        updateUser({ query, populate })
            .then((data) => {
                console.info('SAVE latestFriendRequest data', data);
                resolve(SAVE_FRIEND_SUCCESS);
            }).catch((err) => {
                console.info('SAVE latestFriendRequest err', err);
                reject(SAVE_FRIEND_FAIL);
                // message: `user ${confirmId} add friend ${beConfirmedId} fail`
            });
    });
}