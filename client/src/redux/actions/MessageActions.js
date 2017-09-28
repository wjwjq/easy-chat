import axios from 'axios';
import api  from '../../configs/api';
import { authFail } from './AuthActions';
import { setMessages } from '../../handlers/messages';

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
    return (dispatch) => {
        dispatch({
            type: FETCH_MESSAGES
        });
        axios
            .get(api.messages)
            .then((res) => {
                if (res.data.status === 401) {
                    dispatch(authFail(res.data.message));
                    return; 
                }
                if (res.data.status === 200) {
                    const { messages } =res.data;
                    setMessages(messages);
                    dispatch({
                        type: FETCH_MESSAGES_FULFILLED,
                        payload: messages
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
    return  (dispatch) => {
        axios
            .post(`${api.messages}/${friendId}`)
            .then((res) => {
                if (res.data.status === 401) {
                    dispatch(authFail(res.data.message));
                    return; 
                }
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
    return (dispatch) => {
        axios
            .put(`${api.messages}/${friendId}`,{
                data
            })
            .then((res) => {
                if (res.data.status === 401) {
                    dispatch(authFail(res.data.message));
                    return; 
                }
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
    return (dispatch) => {
        axios
            .delete(`${api.messages}/${friendId}`)
            .then((res) => {
                if (res.data.status === 401) {
                    dispatch(authFail(res.data.message));
                    return; 
                }
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
