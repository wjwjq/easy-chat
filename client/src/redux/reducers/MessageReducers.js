const initialState = {
    messages: [],
    fetching: false,
    fetched: false,
    error: null
};

import {
    FETCH_MESSAGES,
    FETCH_MESSAGES_REJECTED,
    FETCH_MESSAGES_FULFILLED,
    NEW_MESSAGE_REJECTED,
    NEW_MESSAGE_FULFILLED,
    ADD_MESSAGE_REJECTED,
    ADD_MESSAGE_FULFILLED,
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

        //新建消息
        case NEW_MESSAGE_REJECTED: 
            return {
                ...state,
                error: action.payload
            };

        case NEW_MESSAGE_FULFILLED: 
            return {
                ...state,
                messages: state.messages.concat(action.payload)
            };

        //添加消息
        case ADD_MESSAGE_REJECTED:
            return {
                ...state,
                error: action.payload
            };
        case ADD_MESSAGE_FULFILLED:
            return {
                ...state,
                messages: state.messages.map((message) => {
                    if (message.username === action.payload.friendId) {
                        message.msgs.push(action.payload.data);
                    }
                    return message;
                })
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
                messages: state.messages.filter((message) => {
                    if (message.username !== action.payload.friendId) {
                        return message;
                    }
                })
            };

        default:
            return state;
    }
}