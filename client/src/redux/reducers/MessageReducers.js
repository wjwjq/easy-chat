const initialState = {
    messages: {},
    fetching: false,
    fetched: false,
    error: null
};

import {
    FETCH_MESSAGES,
    FETCH_MESSAGES_REJECTED,
    FETCH_MESSAGES_FULFILLED,
    POST_MESSAGE_REJECTED,
    POST_MESSAGE_FULFILLED,
    RECEIVE_MESSAGE_FULFILLED,
    DELETE_MESSAGE_REJECTED,
    DELETE_MESSAGE_FULFILLED
} from '../constant/';

export default function reducers(state = initialState, action) {

    switch (action.type) {
        //抓取消息
        case FETCH_MESSAGES:
            return {
                ...state,
                fetching: true,
                fetched: false
            };
        case FETCH_MESSAGES_REJECTED:
            return {
                ...state,
                fetching: true,
                fetched: false,
                error: action.payload
            };
        case FETCH_MESSAGES_FULFILLED:
            return {
                ...state,
                fetching: false,
                fetched: true,
                messages: action.payload
            };

        //新建 添加
        case POST_MESSAGE_REJECTED:
            return {
                ...state,
                error: action.payload
            };
        case POST_MESSAGE_FULFILLED:
            return {
                ...state,
                messages: Object.assign({}, combineMsg(state))
            };

        //接收消息
        case RECEIVE_MESSAGE_FULFILLED:
            return {
                ...state,
                messages: Object.assign({}, combineMsg(state))
            };

        //删除消息
        case DELETE_MESSAGE_REJECTED:
            return {
                ...state,
                error: action.payload
            };
        case DELETE_MESSAGE_FULFILLED:
            return {
                ...state,
                messages: Object.assign({}, (() => {
                    delete state.messages[action.payload.friendId];
                    return state.messages;
                })())
            };

        default:
            return state;
    }
    
    function combineMsg(state) {
        let messages = state.messages;
        const { friendId, data } = action.payload;
        if (messages.hasOwnProperty(friendId)) {
            messages[friendId].push(data);
        } else {
            messages[friendId] = [data];
        }
        return messages;
    }
}