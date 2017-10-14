import io from 'socket.io-client';

import {
    authFail
} from '../redux/actions/AuthActions';

import {
    receiveMessage
} from '../redux/actions/MessageActions';

import {
    receiveAddFriendRequestReply,
    receiveConfirmAddFriendRequestReply,
    receiveRefuseAddFriendRequestReply,
    receiveDeleteFriendRequestReply
} from '../redux/actions/FriendActions';

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

let socket = null;

/**
 * 建立socket 通信连接
 * 
 * @export connectSocket
 * @param { 
 *      url         服务器端host 默认空，同源
 *      path        非必须，但必定与后端聊天路由保持一致 eg: /api/chat
 *      accessToken token令牌
 *      dispatch    redux dispatch方法
 * } 
 */
export function connectSocket({
    url,
    path,
    accessToken,
    dispatch
}) {
    try {
        socket = io(url, {
            path: path,
            transportOptions: {
                polling: {
                    extraHeaders: {
                        'x-access-token': accessToken
                    }
                }
            }
        });

        //连接时
        socket.on('connect', function () {
            //认证失败
            socket.on(AUTHENTICATION_FAIL, res => onAuthencateFail(dispatch, res));
            //接收消息
            socket.on(RECEIVE_MESSAGE, chunk => onReceiveMessage(dispatch, chunk));

            //接收添加好友请求
            socket.on(RECEIVE_ADD_FRIEND_REQUEST, chunk => onReceiveAddFriendRequest(dispatch, chunk));

            //接收添加好友通过回复
            socket.on(RECEIVE_CONFIRM_ADD_FRIEND_REQUEST, chunk => onReceiveConfirmAddFriendRequest(dispatch, chunk));

            //接收拒绝添加好友回复
            socket.on(RECEIVE_REFUSE_ADD_FRIEND_REQUEST, chunk => onReceiveRefuseAddFriendRequest(dispatch, chunk));
            
            //接受删除好友请求
            socket.on(RECEIVE_DELETE_FRIEND_REQUEST, chunk => onReceiveDeleteFriendRequest(dispatch, chunk));

            //断开连接
            socket.on('disconnect', onDisconnect);

        });
    } catch (err) {
        console.info('connect error: ', err);
    }
}

//认证失败
function onAuthencateFail(dispatch, res) {
    if (res.status === 401) {
        dispatch(authFail(res.message));
        disconnectSocket();
    }
}

//发送消息
export function emitPostMessage(msg) {
    try {
        socket.emit(POST_MESSAGE, msg);
    } catch (err) {
        console.info('POST_MESSAGE error: ', err);
    }
}

//接收消息
function onReceiveMessage(dispatch, chunk) {
    dispatch(receiveMessage(chunk));
}

//1.添加好友请求
export function emitAddFriendRequest(friendId) {
    try {
        socket.emit(ADD_FRIEND_REQUEST, {
            friendId
        });
    } catch (err) {
        console.info('ADD_FRIEND_REQUEST error: ', err);
    }
}

//1.接受发送好友请求 Success 回复
function onReceiveAddFriendRequest(dispatch, chunk) {
    dispatch(receiveAddFriendRequestReply(chunk));
}

//2.确认通过添加好友请求
export function emitConfirmAddFriendRequest(friendId) {
    try {
        socket.emit(CONFIRM_ADD_FRIEND_REQUEST, {
            friendId
        });
    } catch (err) {
        console.info('CONFIRM_ADD_FRIEND_REQUEST error: ', err);
    }
}

//2.接收添加好友通过回复
function onReceiveConfirmAddFriendRequest(dispatch, chunk) {
    dispatch(receiveConfirmAddFriendRequestReply(chunk));
}

//3.拒绝添加好友请求
export function emitRefuseAddFriendRequest(friendId) {
    try {
        socket.emit(REFUSE_ADD_FRIEND_REQUEST, {
            friendId
        });
    } catch (err) {
        console.info('REFUSE_ADD_FRIEND_REQUEST error: ', err);
    }
}

//3.接收拒绝添加好友回复
function onReceiveRefuseAddFriendRequest(dispatch, chunk) {
    dispatch(receiveRefuseAddFriendRequestReply(chunk));
}

//删除好友
export function emitDeleteFriendRequest(friendId) {
    try {
        socket.emit(DELETE_FRIEND_REQUEST, { friendId });
    } catch (err) {
        console.info('DELETE_FRIEND_REQUEST error', err);
    }
}

//收到删除好友回复
function onReceiveDeleteFriendRequest(dispatch, chunk) {
    dispatch(receiveDeleteFriendRequestReply(chunk));
}

//手动断开连接
export function disconnectSocket() {
    try {
        socket.close();
        console.info('socket successfully closed');
    } catch (err) {
        console.info('socket closed', err);
    }
}

//断开连接
function onDisconnect(reason) {
    console.info('client disconneting by server ', reason);
}