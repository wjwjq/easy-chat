import {
    FETCH_FRIENDS_REJECTED,
    FETCH_FRIENDS_FULFILLED,
    QUERY_FRIEND_REJECTED,
    QUERY_FRIEND_FULFILLED,
    ADD_FRIEND_REJECTED,
    ADD_FRIEND_FULFILLED,
    UPDATE_FRIEND_REJECTED,
    UPDATE_FRIEND_FULFILLED,
    DELETE_FRIEND_REJECTED,
    DELETE_FRIEND_FULFILLED
} from '../constant/';

const initialState = {
    friends: [],
    fetching: false,
    fetched: false,
    error: null,
    querying: false,
    queryed: false,
    adding: false,
    added: false,
    updating: false,
    updated: false,
    deleting: false,
    deleted: false
};

export default function reducers(state = initialState, action) {

    switch (action.type) {

        //获取当期用户所有的好友
        case FETCH_FRIENDS_REJECTED:
            return {
                ...state,
                fetch: false,
                error: action.payload
            };
        case FETCH_FRIENDS_FULFILLED:
            return {
                ...state,
                fetch: false,
                fetched: true,
                friends: action.payload
            };

        //查询某个用户信息
        case QUERY_FRIEND_REJECTED:
            return {
                ...state,
                fetch: false,
                error: action.payload
            };
        case QUERY_FRIEND_FULFILLED:
            return {
                ...state,
                fetch: false,
                fetched: true,
                friends: action.payload
            };

        //添加好友
        case ADD_FRIEND_REJECTED:
            return {
                ...state,
                adding: false,
                added: false,
                error: action.payload
            };
        case ADD_FRIEND_FULFILLED:
            return {
                ...state,
                adding: false,
                added: true,
                friends: state.friends.map((friend) => {
                    if (friend.userId === action.payload.userId) {
                        return action.payload.data;
                    } else {
                        return friend;
                    }
                })
            };

        //更新信息好友
        case UPDATE_FRIEND_REJECTED:
            return {
                ...state,
                updating: false,
                updated: false,
                error: action.payload
            };
        case UPDATE_FRIEND_FULFILLED:
            return {
                ...state,
                updating: false,
                updated: true,
                friends: state.friends.map((friend) => {
                    if (friend.userId === action.payload.userId) {
                        return action.payload.data;
                    } else {
                        return friend;
                    }
                })
            };

        //删除好友
        case DELETE_FRIEND_REJECTED:
            return {
                ...state,
                deleting: false,
                deleted: false,
                error: action.payload
            };
        case DELETE_FRIEND_FULFILLED:
            return {
                ...state,
                deleting: false,
                deleted: true,
                friends: state.friends.filter((friend) => friend.userId !== action.payload)
            };

        default:
            return state;
    }
}