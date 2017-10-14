import {
    FETCH_FRIENDS,
    FETCH_FRIENDS_REJECTED,
    FETCH_FRIENDS_FULFILLED,
    QUERY_FRIEND,
    QUERY_FRIEND_REJECTED,
    QUERY_FRIEND_FULFILLED,
    ADD_FRIEND,
    ADD_FRIEND_REJECTED,
    ADD_FRIEND_FULFILLED,
    UPDATE_FRIEND_REJECTED,
    UPDATE_FRIEND_FULFILLED,
    DELETE_FRIEND_REJECTED,
    DELETE_FRIEND_FULFILLED
} from '../constant/';

const initialState = {
    friends: [], //好友列表
    fetching: false, //抓取好友进行中
    fetched: false, //抓取好友完成
    error: null, //错误

    querying: false, //查询用户状态
    queryed: false, //查询用户状态
    queryMsg: '',
    result: '', //查询用户返回的结果
    
    adding: false, //添加好友
    added: false, 
    addMsg: '',

    updating: false, //更新
    updated: false,

    deleting: false,//删除
    deleted: false,

    latestFriendRequest: []
};

const dealAddFriendsState = (state, action) => {
    let friends = [];
    let latestFriendRequest = [];
    if (action.payload.friendId) {
        latestFriendRequest = state.latestFriendRequest.filter(item => {
            if (item.username === action.payload.friendId) {
                friends.push(item);
            } else {
                return item;
            }
        });
    } else {
        friends.push(action.payload.friend);
    }
    return {
        friends: state.friends.concat(friends),
        latestFriendRequest
    };
};

const dealAddFriendsReplayState = (state, action) => {
    let latestFriendRequest;
    let addMsg = '';
    if (action.payload.friend) {
        latestFriendRequest = state.latestFriendRequest.concat([action.payload.friend]);
    } else {
        latestFriendRequest = state.latestFriendRequest;
    }
    addMsg = action.payload.message;
    return {
        latestFriendRequest,
        addMsg
    };
};

export default function reducers(state = initialState, action) {

    switch (action.type) {

        //获取当期用户所有的好友
        case FETCH_FRIENDS: 
            return {
                ...state,
                fetching: true,
                fetched: false,
                error: ''
            };
        case FETCH_FRIENDS_REJECTED:
            return {
                ...state,
                fetching: false,
                fetched: false,
                error: action.payload
            };
        case FETCH_FRIENDS_FULFILLED:
            return {
                ...state,   
                fetching: false,
                fetched: true,
                error: '',
                ...action.payload
            };

        //查询某个用户信息
        case QUERY_FRIEND: 
            return {
                ...state,
                querying: true,
                queryed: false,
                queryMsg: ''
            };
        case QUERY_FRIEND_REJECTED:
            return {
                ...state,
                querying: false,
                queryed: false,
                queryMsg: action.payload
            };
        case QUERY_FRIEND_FULFILLED:
            return {
                ...state,
                querying: false,
                queryed: true,
                queryMsg: '',
                result: action.payload
            };

        //添加好友
        case ADD_FRIEND: 
            return {
                ...state,
                result: '',
                ...dealAddFriendsReplayState(state, action)
            };
        case ADD_FRIEND_REJECTED:
            return {
                ...state,
                adding: false,
                added: false,
                latestFriendRequest: state.latestFriendRequest.filter(item => item.username !== action.payload.friendId),
                addMsg: action.payload.message
            };
        case ADD_FRIEND_FULFILLED:
            return {
                ...state,
                adding: false,
                added: true,
                addMsg: action.payload.message,
                ...dealAddFriendsState(state, action)
            };

        //更新信息好友1
        case UPDATE_FRIEND_REJECTED:
            return {
                ...state,
                updating: false,
                updated: false,
                updateMsg: action.payload.message
            };
        case UPDATE_FRIEND_FULFILLED:
            return {
                ...state,
                updating: false,
                updated: true,
                friends: state.friends.map(friend => {
                    if (friend.username === action.payload.friendId) {
                        return Object.assign({}, friend, action.payload);
                    }
                    return friend;
                }),
                updateMsg: action.payload.message
            };

        //删除好友
        case DELETE_FRIEND_REJECTED:
            return {
                ...state,
                deleting: false,
                deleted: false,
                deleletMsg: action.payload.message
            };
        case DELETE_FRIEND_FULFILLED:
            return {
                ...state,
                deleting: false,
                deleted: true,
                friends: state.friends.filter(friend => friend.username !== action.payload.friendId),
                deleletMsg: action.payload.message
            };

        default:
            return state;
    }
}