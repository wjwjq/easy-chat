import axios from 'axios';
import api  from '../../configs/api';
import { getItem } from '../../configs/storage';

import {
    FETCH_MESSAGES,
    FETCH_MESSAGES_REJECTED,
    FETCH_MESSAGES_FULFILLED,
    NEW_MESSAGE_REJECTED,
    NEW_MESSAGE_FULFILLED,
    ADD_MESSAGE_REJECTED,
    ADD_MESSAGE_FULFILLED,
    DELETE_MESSAGE_REJECTED,
    DELETE_MESSAGE_FULFILLED
} from '../constant/';

//抓取所有信息列表
export function fetchMessages() {
    return function (dispatch) {
        dispatch({
            type: FETCH_MESSAGES
        });
        axios
            .get(api.messages,{
                headers: {
                    'x-access-token': getItem('access_token')['token']
                }
            })
            .then((res) => {
                if (res.data.status === 200) {
                    dispatch({
                        type: FETCH_MESSAGES_FULFILLED,
                        payload: res.data.messages
                    });
                } else {
                    dispatch({
                        type: FETCH_MESSAGES_REJECTED,
                        payload: res.data.message
                    });
                }
            })
            .catch((err) =>
                dispatch({
                    type: FETCH_MESSAGES_REJECTED,
                    payload: err.message
                })
            );
    }; 
}

//新建消息
export function newMessage(friendId, data) {
    return function (dispatch) {
        axios
            .post(`${api.messages}/${friendId}`,{
                data,
                'access_token': getItem('access_token')['token']
            })
            .then((res) => {
                if (res.data.status === 200) {
                    dispatch({
                        type: NEW_MESSAGE_FULFILLED,
                        payload: {
                            username: friendId,
                            msgs: [data]
                        }
                    });
                } else {
                    dispatch({
                        type: NEW_MESSAGE_REJECTED,
                        payload: res.data.message
                    });
                }
            })
            .catch((err) => dispatch({
                type: NEW_MESSAGE_REJECTED,
                payload: err.message
            }));
    };
}

//添加信息
export function addMessage(friendId, data) {
    return function (dispatch) {
        axios
            .put(`${api.messages}/${friendId}`,{
                data,
                'access_token': getItem('access_token')['token']
            })
            .then((res) => {
                if (res.data.status === 200) {
                    dispatch({
                        type: ADD_MESSAGE_FULFILLED,
                        payload: {
                            friendId,
                            data
                        }
                    });
                } else {
                    dispatch({
                        type: ADD_MESSAGE_REJECTED,
                        payload: res.data.message
                    });
                }
            })
            .catch((err) => dispatch({
                type: ADD_MESSAGE_REJECTED,
                payload: err.message
            }));
    };
}

//删除信息
export function deleteMessage(friendId) {
    return function (dispatch) {
        axios
            .delete(`${api.messages}/${friendId}`,{
                headers: {
                    'x-access-token': getItem('access_token')['token']
                }
            })
            .then((res) => {
                if (res.data.status === 200) {
                    dispatch({
                        type: DELETE_MESSAGE_FULFILLED,
                        payload: { friendId }
                    });
                } else {
                    dispatch({
                        type: DELETE_MESSAGE_REJECTED,
                        payload: res.data.message
                    });
                }
            })
            .catch((err) => dispatch({
                type: DELETE_MESSAGE_REJECTED,
                payload: err.message
            }));
    };
}
