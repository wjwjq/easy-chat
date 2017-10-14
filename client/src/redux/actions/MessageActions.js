import axios from 'axios';
import api  from '../../configs/api';

import { authFail } from './AuthActions';

import { emitPostMessage } from '../../handlers/chat';
import { setMessages } from '../../handlers/messages';

import {
    FETCH_MESSAGES,
    FETCH_MESSAGES_REJECTED,
    FETCH_MESSAGES_FULFILLED,
    // POST_MESSAGE_REJECTED,
    POST_MESSAGE_FULFILLED,
    RECEIVE_MESSAGE_FULFILLED,
    DELETE_MESSAGE_REJECTED,
    DELETE_MESSAGE_FULFILLED
} from '../constant/';

//抓取所有信息列表
export function fetchMessages() {
    return dispatch => {
        dispatch({
            type: FETCH_MESSAGES
        });
        axios
            .get(api.messages)
            .then(res => {
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
            .catch(err =>
                dispatch({
                    type: FETCH_MESSAGES_REJECTED,
                    payload: err.message
                })
            );
    }; 
}

/*新建消息 或 添加信息
 * data: Object {
 * }
 **/
export function addMessage(msg) {
    console.info('msg', msg);
    if (msg.data.from !== msg.data.to) {
        //反转身份
        const postMsg = {
            friendId: msg.data.from,
            data: msg.data
        };
        emitPostMessage(postMsg);
    }
    return {
        type: POST_MESSAGE_FULFILLED,
        payload: msg
    };
}

export function receiveMessage(msg) {
    return {
        type: RECEIVE_MESSAGE_FULFILLED,
        payload: msg
    };
}

//删除信息
export function deleteMessage(friendId) {
    return dispatch => {
        axios
            .delete(`${api.messages}/${friendId}`)
            .then(res => {
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
            .catch(err => dispatch({
                type: DELETE_MESSAGE_REJECTED,
                payload: err.message
            }));
    };
}