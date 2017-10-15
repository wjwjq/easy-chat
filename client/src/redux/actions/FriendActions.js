import axios from 'axios';
import { push } from 'react-router-redux';
import api from '../../configs/api';
import pathConfigs from '../../routes/path';
import { authFail } from './AuthActions';
import { setFriends } from '../../handlers/friends';

import { 
    emitAddFriendRequest,
    emitConfirmAddFriendRequest,
    emitRefuseAddFriendRequest, 
    emitDeleteFriendRequest 
} from '../../handlers/chat';

import {
    FETCH_FRIENDS,
    FETCH_FRIENDS_REJECTED,
    FETCH_FRIENDS_FULFILLED,
    QUERY_FRIEND,
    QUERY_FRIEND_REJECTED,
    QUERY_FRIEND_FULFILLED,
    ADD_FRIEND,
    ADD_FRIEND_REJECTED,
    ADD_FRIEND_FULFILLED,
    UPDATE_FRIEND_REJECTED,
    UPDATE_FRIEND_FULFILLED,
    DELETE_FRIEND_REJECTED,
    DELETE_FRIEND_FULFILLED,
    DELETE_MESSAGE_FULFILLED
} from '../constant/';

//获取当期用户所有的好友和最新的添加好友请求
export function fetchFriends() {
    return dispatch =>  {
        dispatch({
            type: FETCH_FRIENDS
        });
        axios
            .get(`${api.friends}`)
            .then(res => {
                if (res.data.status === 401) {
                    dispatch(authFail(res.data.message));
                    return; 
                }
                if (res.data.status === 200) {
                    const { friends, latestFriendRequest } = res.data;
                    setFriends(friends);
                    dispatch({
                        type: FETCH_FRIENDS_FULFILLED,
                        payload: { friends, latestFriendRequest }
                    });
                } else {
                    dispatch({
                        type: FETCH_FRIENDS_REJECTED,
                        payload: res.data.message
                    });
                }
            })
            .catch(err =>
                dispatch({
                    type: FETCH_FRIENDS_REJECTED,
                    payload: err.message
                })
            );
    };
}

//查询某个用户信息
export function queryFriend(friendId) {
    return  dispatch => {
        dispatch({
            type: QUERY_FRIEND
        });
        axios
            .get(`${api.friends}/${friendId}`)
            .then(res => {
                if (res.data.status === 401) {
                    dispatch(authFail(res.data.message));
                    return; 
                }
                if (res.data.status === 204) {
                    dispatch({
                        type: QUERY_FRIEND_REJECTED,
                        payload: res.data.message
                    });
                }
                if (res.data.status === 200) {
                    dispatch({
                        type: QUERY_FRIEND_FULFILLED,
                        payload: res.data.friend
                    });
                } else {
                    dispatch({
                        type: QUERY_FRIEND_REJECTED,
                        payload: res.data.message
                    });
                }
            })
            .catch(err => dispatch({
                type: QUERY_FRIEND_REJECTED,
                payload: err.message
            }));
    };
}

//发送添加好友请求
export function addFriend(friendId) {
    emitAddFriendRequest(friendId);
}

//同意好友添加请求
export function agreeAddRequest(friendId) {
    emitConfirmAddFriendRequest(friendId);
}

//拒绝好友添加请求
export function refuseAddRequest(friendId) {
    emitRefuseAddFriendRequest(friendId);
}

//删除好友
export function deleteFriend(friendId) {
    emitDeleteFriendRequest(friendId);
}

//接收添加好友回复
export function receiveAddFriendRequestReply(res) {
    return dispatch => {
        dispatch({
            type: ADD_FRIEND,
            payload: res
        });
    };
}

//接收到添加好友确认回复
export function receiveConfirmAddFriendRequestReply(res) {
    return dispatch => {
        dispatch({
            type: ADD_FRIEND_FULFILLED,
            payload: res
        });
    };
}

//接收到添加好友拒绝回复
export function receiveRefuseAddFriendRequestReply(res) {
    return dispatch => {
        dispatch({
            type: ADD_FRIEND_REJECTED,
            payload: res
        });
    };
}

//收到删除好友请求回复
export function receiveDeleteFriendRequestReply(res) {
    return dispatch => {
        if (res.status === 200) {
            dispatch(push(pathConfigs.root));
            dispatch({
                type: DELETE_MESSAGE_FULFILLED,
                payload: {
                    friendId: res.friendId
                }
            });
            dispatch({
                type: DELETE_FRIEND_FULFILLED,
                payload: res
            });
        } else {
            dispatch({
                type: DELETE_FRIEND_REJECTED,
                payload: res.message
            });
        }
    };
}

//更新信息好友
export function updateFriend(userId, data) {
    return  dispatch => {
        axios
            .put(`${api.friends}/${userId}`, {
                data
            })
            .then(res => {
                if (res.data.status === 401) {
                    dispatch(authFail(res.data.message));
                    return; 
                }
                if (res.data.status === 200) {
                    dispatch({
                        type: UPDATE_FRIEND_FULFILLED,
                        payload: res.data.message
                    });
                } else {
                    dispatch({
                        type: UPDATE_FRIEND_REJECTED,
                        payload: res.data.message
                    });
                }
            })
            .catch(err => dispatch({
                type: UPDATE_FRIEND_REJECTED,
                payload: err.message
            }));
    };
}

export function clearNotificationMsg() {
    return dispatch => {
        dispatch({
            type: 'CLEAR_NOTIFICATION_MSG'
        });
    };
}