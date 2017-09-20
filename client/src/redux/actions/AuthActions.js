import api from '../../configs/api';
import axios from 'axios';

import { fetchFriends } from './FriendActions';
import { fetchMessages } from './MessageActions';
import { setItem, getItem, removeItem } from '../../configs/storage';

import {
    SIGN_UP_REJECTED,
    SIGN_UP_FULFILLED,
    SIGN_IN_REJECTED, 
    SIGN_IN_FULFILLED,
    GET_VALID_REJECTED,
    GET_VALID_FULFILLED
} from '../constant/';

//登录
export function signIn(userInfo) {
    return function (dispatch) {
        const accessToken = getItem('access_token');
        const expired = accessToken && accessToken['expires'] > Math.floor(Date.now() / 1000);
        !expired && removeItem('access_token');
        axios
            .post(api.auth.signin,{
                ...userInfo,
                'access_token':  expired ? accessToken.token : ''
            })
            .then((res) => {
                if (res.data.status === 401) {
                    return dispatch({
                        type: SIGN_IN_REJECTED,
                        payload: res.data.message
                    });
                }

                const token = res.data.token;
                //setCookies Or localStorage
                token && setItem('access_token', JSON.stringify(token));
                
                dispatch({
                    type: SIGN_IN_FULFILLED,
                    payload: { token,  user : Object.assign({}, res.data.user) }
                });

                //须确保 好友数据返回必须优先于消息数据返回
                //抓取用户好友
                dispatch(fetchFriends());
                 
                //抓取用户已有消息历史
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
        axios
            .post(api.auth.signup,{
                ...userInfo
            })
            .then((res) => {
          
                if (res.data.status === 200) {
                    dispatch({
                        type: SIGN_UP_FULFILLED,
                        payload: true
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
                    //todo: setCookies Or localStorage
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