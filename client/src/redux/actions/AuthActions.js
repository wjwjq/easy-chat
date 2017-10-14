import axios from 'axios';
import { push } from 'react-router-redux';
import pathConfigs  from '../../routes/path';
import api from '../../configs/api';
import { connectSocket, disconnectSocket } from '../../handlers/chat';
import { fetchFriends } from './FriendActions';
import { fetchMessages } from './MessageActions';
import { isTokenExpired, setToken, getToken, clearToken } from '../../handlers/token';

import {
    SIGN_IN,
    SIGN_IN_REJECTED,
    SIGN_IN_FULFILLED,
    SIGN_UP,
    SIGN_UP_REJECTED,
    SIGN_UP_FULFILLED,
    SIGN_OUT,
    AUTH_FAIL,
    GET_VALID,
    GET_VALID_REJECTED,
    GET_VALID_FULFILLED,
    CLEAR_AUTH_MESSAGE
} from '../constant/';

//登录
export function signIn(userInfo) {

    return dispatch => {
        dispatch({
            type: SIGN_IN
        });

        axios
            .post(api.auth.signin, {
                ...userInfo,
                'access_token':  isTokenExpired()  ?  getToken() :  ''
            })
            .then(res => {
                if (res.data.status === 401) {
                    clearToken();
                    return dispatch({
                        type: SIGN_IN_REJECTED,
                        payload: res.data.message
                    });
                }

                if (res.data.status !== 200) {
                    return dispatch({
                        type: SIGN_IN_REJECTED,
                        payload: res.data.message
                    });
                }

                const token = res.data.token;
                token && setToken(token);
                const accessToken = token ? token.token : getToken();
                axios.defaults.headers.common['x-access-token'] = accessToken;
                //socket 链接携带cookie
                connectSocket({
                    url: '', 
                    path: api.chat, 
                    accessToken, 
                    dispatch
                });

                dispatch({
                    type: SIGN_IN_FULFILLED,
                    payload: {
                        user: Object.assign({}, res.data.user),
                        message: res.data.message
                    }
                });

                //须确保 好友数据返回必须优先于消息数据返回
                //抓取用户好友
                dispatch(fetchFriends());
                dispatch(fetchMessages());
                
                dispatch(push(pathConfigs.root));
                
            })
            .catch(err => {
                dispatch({
                    type: SIGN_IN_REJECTED,
                    payload: err.message
                });
            });
    };
}

//注册
export function signUp(userInfo) {
    return dispatch => {
        dispatch({
            type: SIGN_UP
        });

        axios
            .post(api.auth.signup, {
                ...userInfo
            })
            .then(res => {
                if (res.data.status === 200) {
                    dispatch({
                        type: SIGN_UP_FULFILLED,
                        payload: res.data.message
                    });
                } else {
                    dispatch({
                        type: SIGN_UP_REJECTED,
                        payload: res.data.message
                    });
                }
            })
            .catch(err => {
                dispatch({
                    type: SIGN_UP_REJECTED,
                    payload: err.message
                });
            });
    };
}

//注销
export function signOut() {
    return dispatch => {
        clearToken();
        axios.defaults.headers.common['x-access-token'] = '';
        disconnectSocket();
        dispatch({ type: SIGN_OUT });
        dispatch(push(pathConfigs.signin));
    };
}

//认证失败
export function authFail(message) {
    console.info(message);
    return dispatch => {
        dispatch(signOut());
        dispatch({
            type: AUTH_FAIL,
            payload: message
        });
    };
}

/**
 * 获取验证码
 * 
 * @export
 * @param {any} username 必选: 用户名
 * @param {string} type  可选：若为signup 则后端再获取验证码之前会验证用户名是否存在 
 * @returns 
 */
export function getValid(username, type) {
    return  dispatch  => {
        dispatch({
            type: GET_VALID
        });
        axios
            .post(api.auth.valid, {
                username,
                type
            })
            .then(res => {
                if (res.data.status === 200) {
                    dispatch({
                        type: GET_VALID_FULFILLED,
                        payload: res.data.message
                    });
                } else {
                    dispatch({
                        type: GET_VALID_REJECTED,
                        payload: {
                            message: res.data.message,
                            reset: res.data.status === 401
                        }
                    });
                }
            })
            .catch(err => {
                dispatch({
                    type: GET_VALID_REJECTED,
                    payload: err.message
                });
            });
    };
}

export function clearAuthMessage() {
    return {
        type: CLEAR_AUTH_MESSAGE
    };
}


// function fetchResource(url) {
//     return new Promise((resolve ,reject) => {
//         axios
//             .get(url)
//             .then((res) => {
//                 resolve(res);
//             })
//             .catch(reject);
//     });
// }

// async function fetchAllResources() {
//     // let r;
//     // try {
//     //     r = await fetchResource(api.friends);
//     //     r = await fetchResource(api.messages);
//     // } catch (err) {
//     //     return Promise.reject(err);
//     // }
//     // return r;
//     return Promise.all([fetchResource(api.friends), fetchResource(api.messages)]);
// }

