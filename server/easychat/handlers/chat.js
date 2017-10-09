const tokenManager = require('../../middlewares/tokenManager');
const Chatroom = require('../../models/chatroom');
const User = require('../../models/user');

const chat = (io) => {

    //token authentication middleware
    io.use((socket, next) => {
        let accessToken = tokenManager.parseToken(socket.handshake);
       
        const failVerify =  () => {
            console.info('auth fail');
            return next(new Error('chating authentication error'));
        };
       
        const sccussVerify = (username) => {
            Chatroom.remove({
                username: username
            });
            const chatroom = new Chatroom({
                username,
                socketId: socket.id
            });
            chatroom.save((err) => {
                if (err) {
                    console.info('chating session save failed');
                    return next(new Error('chating session save failed'));
                }
            });
            socket.handshake.user = username;
            next();
        };
        tokenManager.verify(accessToken, failVerify, sccussVerify);
    });

    //建立连接
    io.on('connection', (socket) => {
        console.info('client connecting');

        const currUsername = socket.handshake.user;

        //接受消息
        socket.on('postMessage', (chunk) => {
            console.info('chunk ', chunk);
            const friendId = chunk.data.to;
            //消息转发
            Chatroom.findOne({
                username: friendId
            }).then((onlineUser) => {
                //用户在线
                if (onlineUser.socketId) {
                    console.info(`user is online`, onlineUser.socketId);
                    socket.to(onlineUser.socketId).emit('receiveMessage', chunk);
                }
            }).catch((err) => {
                if (err) {
                    //聊天对象当前不在线, 将消息更新到该对象的最新聊天记录中，便于用户上线时获取
                    console.info(`user is offline`);
                    User.update({
                        username: friendId
                    }, {
                        $push: {
                            latestMessages: chunk
                        }
                    }).then((data) => {
                        console.info('data', data);
                    }).catch((err) => {
                        console.info('update err', err);
                    });
                }

            });
        });

        //添加好友通知
        socket.on('addFriend', (chunk) => {
            // const friendId = chunk.friendId;
            // User.findOne({
            //     username: friendId
            // })
            // socket.to(onlineUser.socketId).emit('receiveMessage', chunk);
        });

        // socket.emit('authentication_fail', (reason) => {
        // });
      
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

module.exports = chat;