/*todo: 1. 身份验证
 *      2. 身份回话保存 1 TO 1 单一转发
 *      3. 验证好友当前是否在线, 在线转发消息，否则缓存消息，带好友上线后拉去
 **/
const chat = (io) => {
    const user = new Set();
    io.use((socket, next) => {
        let accessToken = socket.handshake.headers['access_token'];
        console.info('access_token is: ', accessToken);
        console.info('socket id', socket.id);
        return next();
        // if (isValid(clientId)) {
        //     return next();
        // }
        return next(new Error('authentication error'));
    });
    io.on('connection',  (socket) => {
        console.info('client connecting');
        const currSocketId = socket.id;
        user.add(currSocketId);
        //接受消息
        socket.on('postMessage',  (data) => {
            //消息转发
            user.forEach((id) => {
                if (id !== currSocketId) {
                    socket.to(id).emit('receiveMessage', data); 
                }
            });
        });

        socket.on('disconnecting', (reason) => {
            console.info('client disconnected');
            console.info('reason', reason);
            user.delete(currSocketId);
        });
    });
}; 

module.exports = chat;