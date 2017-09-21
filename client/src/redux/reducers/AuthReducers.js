const initalState = {
    user: {},
    valid: {},
    token: '',
    isLogining: false,
    isLogined: false,
    isRegistering: false,
    isRegistered: false,
    msg: '',
    isTokenNotExpired: true,
    error: ''
};

import {
    SIGN_IN,
    SIGN_IN_REJECTED, 
    SIGN_IN_FULFILLED,
    SIGN_UP,
    SIGN_UP_REJECTED,
    SIGN_UP_FULFILLED,
    GET_VALID_REJECTED,
    GET_VALID_FULFILLED
} from '../constant/';

export default function reducers(state = initalState, action) {
    switch (action.type) {
        //登录
        case SIGN_IN:
            return {
                ...state,
                isLogining: true,
                isLogined: false,
                error: ''
            };
        case SIGN_IN_REJECTED:
            return {
                ...state,
                isLogining: false,
                isLogined: false,
                error: action.payload
            };
        case SIGN_IN_FULFILLED:
            return {
                ...state,
                user: action.payload.user,
                isLogined: true,
                isLogining: false,
                error: ''
            };

        //注册
        case  SIGN_UP:
            return {
                ...state,
                isRegistering: true,
                isRegistered: false,
                error: ''
            };
        case SIGN_UP_REJECTED:
            return {
                ...state,
                isRegistering: false,
                isRegistered: false,
                error: action.payload
            };
        case SIGN_UP_FULFILLED:
            return {
                ...state,
                isRegistering: false,
                isRegistered: true,
                msg: action.payload
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