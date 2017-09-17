const initalState = {
    user: {},
    valid: {},
    logining: '',
    logined: '',
    token: '',
    isLogined: false,
    isRegistered: false,
    error: ''
};

import {
    SIGN_UP_REJECTED,
    SIGN_UP_FULFILLED,
    SIGN_IN_REJECTED, 
    SIGN_IN_FULFILLED,
    GET_VALID_REJECTED,
    GET_VALID_FULFILLED
} from '../constant/';

export default function reducers(state = initalState, action) {
    switch (action.type) {
        //登录
        case SIGN_UP_REJECTED:
            return {
                ...state,
                logining: false,
                error: action.payload
            };
        case SIGN_UP_FULFILLED:
            return {
                ...state,
                logined: true,
                user: action.payload.user,
                token: action.payload.token,
                isLogined: true
            };
        //注册
        case SIGN_IN_REJECTED:
            return {
                ...state,
                error: action.payload
            };
        case SIGN_IN_FULFILLED:
            return {
                ...state,
                isRegistered: action.payload
            };

        //获取验证码
        case GET_VALID_REJECTED:
            return {
                ...state,
                error: action.payload
            };
        case GET_VALID_FULFILLED:
            return {
                ...state,
                valid: action.payload
            };
        default:
            return state;
    }
}