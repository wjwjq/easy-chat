import axios from 'axios';
// import { push } from 'react-router-redux';
import pathConfigs  from '../../routes/path';
import api from '../../configs/api';

import { history } from '../../redux/store/';


import {
    fetchFriends
} from './FriendActions';
import {
    fetchMessages
} from './MessageActions';
import {
    isTokenExpired,
    setToken,
    getToken,
    clearToken
} from '../../handlers/token';

import {
    SIGN_IN,
    SIGN_IN_REJECTED,
    SIGN_IN_FULFILLED,
    SIGN_UP,
    SIGN_UP_REJECTED,
    SIGN_UP_FULFILLED,
    LOG_OUT,
    AUTH_FAIL,
    GET_VALID_REJECTED,
    GET_VALID_FULFILLED
} from '../constant/';

//登录
export function signIn(userInfo) {

    return (dispatch) => {
        dispatch({
            type: SIGN_IN
        });

        axios
            .post(api.auth.signin, {
                ...userInfo,
                'access_token':  isTokenExpired()  ?  getToken() :  ''
            })
            .then((res) => {
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
                axios.defaults.headers.common['x-access-token'] = token ? token.token : getToken();

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
            })
            .catch((err) => {
                dispatch({
                    type: SIGN_IN_REJECTED,
                    payload: err.message
                });
            });
    };
}

//注册
export function signUp(userInfo) {
    return (dispatch) => {
        dispatch({
            type: SIGN_UP
        });

        axios
            .post(api.auth.signup, {
                ...userInfo
            })
            .then((res) => {

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
            .catch((err) => {
                dispatch({
                    type: SIGN_UP_REJECTED,
                    payload: err.message
                });
            });
    };
}

//注销
export function logout() {
    return (dispatch) => {
        clearToken();
        axios.defaults.headers.common['x-access-token'] = '';
        dispatch({ type: LOG_OUT });
        // dispatch();
        history.push(pathConfigs.signin);
    };
}

export function authFail(message) {
    return (dispatch) => {
        dispatch(logout());
        dispatch({
            type: AUTH_FAIL,
            payload: message
        });
    };
}

//获取验证码
export function getValid(username) {
    return  (dispatch)  => {
        axios
            .post(api.auth.valid, {
                username
            })
            .then((res) => {
                if (res.data.status === 200) {
                    dispatch({
                        type: GET_VALID_FULFILLED,
                        payload: res.data.valid
                    });
                } else {
                    dispatch({
                        type: GET_VALID_REJECTED,
                        payload: res.data.message
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: GET_VALID_REJECTED,
                    payload: err.message
                });
            });
    };
}