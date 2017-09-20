import axios from 'axios';
import api  from '../../configs/api';
import { getItem } from '../../configs/storage';

import {
    FETCH_MESSAGES_REJECTED,
    FETCH_MESSAGES_FULFILLED,
    ADD_MESSAGE_REJECTED,
    ADD_MESSAGE_FULFILLED,
    DELETE_MESSAGE_REJECTED,
    DELETE_MESSAGE_FULFILLED
} from '../constant/';

//抓取所有信息列表
export function fetchMessages() {
    return function (dispatch) {
        axios
            .get(api.messages,{
                headers: {
                    'x-access-token': getItem('access_token')['token']
                }
            })
            .then((res) => {
                dispatch({
                    type: FETCH_MESSAGES_FULFILLED,
                    payload: res.data
                });
            }
            )
            .catch((err) =>
                dispatch({
                    type: FETCH_MESSAGES_REJECTED,
                    payload: err
                })
            );
    }; 
}

//添加信息
export function addMessage(userId, data) {
    return function (dispatch) {
        axios
            .post(`${api.messages}/${userId}`,{
                data
            })
            .then((res) => {
                if (res.data.status === 200) {
                    dispatch({
                        type: ADD_MESSAGE_FULFILLED,
                        payload: {
                            userId,
                            data
                        }
                    });
                } else {
                    dispatch({
                        type: ADD_MESSAGE_REJECTED,
                        payload: err
                    });
                }
            })
            .catch((err) => dispatch({
                type: ADD_MESSAGE_REJECTED,
                payload: err
            }));
    };
}

//删除信息
export function deleteMessage(userId) {
    return function (dispatch) {
        axios
            .post(`${api.messages}/${userId}`,{
                data
            })
            .then((res) => {
                if (res.data.status === 200) {
                    dispatch({
                        type: DELETE_MESSAGE_FULFILLED,
                        payload: {
                            userId,
                            data
                        }
                    });
                } else {
                    dispatch({
                        type: DELETE_MESSAGE_REJECTED,
                        payload: err
                    });
                }
            })
            .catch((err) => dispatch({
                type: DELETE_MESSAGE_REJECTED,
                payload: err
            }));
    };
}
