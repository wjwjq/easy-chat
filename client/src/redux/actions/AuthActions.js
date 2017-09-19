import api from '../../configs/api';
import axios from 'axios';

import { fetchFriends } from './FriendActions';
import { fetchMessages } from './MessageActions';
import storage from '../../configs/storage';

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
        axios
            .post(api.auth.signin,{
                data: userInfo
            })
            .then((res) => {
                if (res.data.status === 204) {
                    return dispatch({
                        type: SIGN_IN_REJECTED,
                        payload: '重定向'
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
                storage.setItem('access_token', token);

                dispatch({
                    type: SIGN_IN_FULFILLED,
                    payload: { token,  user : Object.assign({}, userInfo.user, res.data.user) }
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
                data: userInfo
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