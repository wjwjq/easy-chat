const initalState = {
    user: {},

    isLogining: false,
    isLogined: false,
    loginMsg: '',

    isRegistering: false,
    isRegistered: false,
    registryMsg: '',

    verifyCodeMsg: '',
    validButtonReset: false
};

import {
    SIGN_IN,
    SIGN_IN_REJECTED,
    SIGN_IN_FULFILLED,
    SIGN_UP,
    SIGN_UP_REJECTED,
    SIGN_UP_FULFILLED,
    AUTH_FAIL,
    GET_VALID,
    GET_VALID_REJECTED,
    GET_VALID_FULFILLED,
    CLEAR_AUTH_MESSAGE
} from '../constant/';

export default function reducers(state = initalState, action) {
    switch (action.type) {
        //登录
        case SIGN_IN:
            return {
                ...state,
                isLogining: true,
                isRegistered: false,
                loginMsg: ''
            };
        case SIGN_IN_REJECTED:
            return {
                ...state,
                isLogining: false,
                isLogined: false,
                loginMsg: action.payload
            };
        case SIGN_IN_FULFILLED:
            return {
                ...state,
                isLogined: true,
                isLogining: false,
                user: action.payload.user,
                loginMsg: action.payload.message,
                verifyCodeMsg: ''
            };
        
            //注册
        case SIGN_UP:
            return {
                ...state,
                isRegistering: true,
                isRegistered: false,
                registryMsg: ''
            };
        case SIGN_UP_REJECTED:
            return {
                ...state,
                isRegistering: false,
                isRegistered: false,
                registryMsg: action.payload
            };
        case SIGN_UP_FULFILLED:
            return {
                ...state,
                isRegistering: false,
                isRegistered: true,
                registryMsg: action.payload,
                loginMsg: '',
                verifyCodeMsg: ''
            };
   
            //自动登录失败
        case AUTH_FAIL:
            return {
                ...state,
                loginMsg: action.payload
            };
            //获取验证码
        case GET_VALID:
            return {
                ...state,
                validButtonReset: false,
                verifyCodeMsg: ''
            };
        case GET_VALID_REJECTED:
            return {
                ...state,
                verifyCodeMsg: action.payload.message,
                validButtonReset: action.payload.reset
            };
        case GET_VALID_FULFILLED:
            return {
                ...state,
                validButtonReset: false,
                verifyCodeMsg: action.payload
            };

        //清空Msg
        case CLEAR_AUTH_MESSAGE: 
            return {
                ...state,
                verifyCodeMsg: '',
                registryMsg: '',
                loginMsg: ''
            };
        default:
            return state;
    }
}