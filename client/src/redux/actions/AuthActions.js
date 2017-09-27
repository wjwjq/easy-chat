import api from '../../configs/api';
import axios from 'axios';

import { fetchFriends } from './FriendActions';
import { fetchMessages } from './MessageActions';
import { isTokenExpired, setToken, getToken, clearToken } from '../../configs/tokenHandlers';

import {
    SIGN_IN,
    SIGN_IN_REJECTED, 
    SIGN_IN_FULFILLED,
    SIGN_UP,
    SIGN_UP_REJECTED,
    SIGN_UP_FULFILLED,
    LOG_OUT,
    GET_VALID_REJECTED,
    GET_VALID_FULFILLED
} from '../constant/';

//登录
export function signIn(userInfo) {

    return function (dispatch) {
        dispatch({
            type: SIGN_IN
        });

        axios
            .post(api.auth.signin,{
                ...userInfo,
                'access_token':  isTokenExpired() ? getToken() : ''
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
                //setCookies Or localStorage
                token && setToken(token);
                
                dispatch({
                    type: SIGN_IN_FULFILLED,
                    payload: { user : Object.assign({}, res.data.user), message: res.data.message }
                });

                //须确保 好友数据返回必须优先于消息数据返回
                //抓取用户好友
                dispatch(fetchFriends(res.data.user.username));
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
    return function (dispatch) {
        dispatch({
            type: SIGN_UP
        });

        axios
            .post(api.auth.signup,{
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
    clearToken();
    return {
        type: LOG_OUT
    };
}

//获取验证码
export function getValid(username, type) {
    return function (dispatch) {
        axios
            .post(api.auth.valid,{
                username,
                type
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