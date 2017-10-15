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

    updating: false, //更新
    updated: false,

    deleting: false,//删除
    deleted: false,

    latestFriendRequest: [], //最新好友请求
    sendFriendRequestSuccessMsg: '',
    receiveANewFriendRequestMsg: '',
    receiveAConfirmFriendRequestMsg: '',
    receiveRefuseAddFriendRequestMsg: ''
};

//检查LatesetFriendRequest 是否已经存在相同请求
const CheckIsExistedLatesetFriendRequest = (state, friend) => {
    let latestFriendRequest =  state.latestFriendRequest;
    const len = latestFriendRequest.length;
    for (let i = 0; i< len;i++) {
        if (latestFriendRequest[i].username === friend.username) {
            return true;
        }
    }
    return false;
};

//添加好友或收到回复时state处理
const dealAddFriendsReplayState = (state, action) => {
    let latestFriendRequest;
    let receiveANewFriendRequestMsg = '';
    let sendFriendRequestSuccessMsg = '';
    const { message, friend } = action.payload;
    //收到回复
    if (friend) {
        latestFriendRequest = !CheckIsExistedLatesetFriendRequest(state, friend) ? state.latestFriendRequest.concat([friend]) : state.latestFriendRequest;
        receiveANewFriendRequestMsg = message;
    } else { //添加
        latestFriendRequest = state.latestFriendRequest;
        sendFriendRequestSuccessMsg = message;
    }
    return {
        latestFriendRequest,
        receiveANewFriendRequestMsg,
        sendFriendRequestSuccessMsg
    };
};

//收到拒绝时state处理
const dealAddFriendFailState = (state, action) => {
    let latestFriendRequest;
    const { message, friendId } = action.payload;
    latestFriendRequest = state.latestFriendRequest.filter(item => item.username !== friendId);
    return {
        latestFriendRequest,
        receiveRefuseAddFriendRequestMsg: message
    };
};

//收到同意时state处理
const dealAddFriendsSuccessState = (state, action) => {
    let friends = [];
    let latestFriendRequest;
    const { message, friendId, friend } = action.payload;
    if (friendId) { //同意
        latestFriendRequest = state.latestFriendRequest.filter(item => {
            if (item.username === friendId) {
                friends.push(item);
            } else {
                return item;
            }
        });
    } else { //收到同意回复
        latestFriendRequest = state.latestFriendRequest;
        friends.push(friend);
    }
    return {
        friends: state.friends.concat(friends),
        receiveAConfirmFriendRequestMsg: message,
        latestFriendRequest
    };
};

//导出reducers
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
                ...dealAddFriendFailState(state, action) 
            };
        case ADD_FRIEND_FULFILLED:
            return {
                ...state,
                adding: false,
                added: true,
                addMsg: action.payload.message,
                ...dealAddFriendsSuccessState(state, action)
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

        //清空通知消息
        case 'CLEAR_NOTIFICATION_MSG':
            return {
                ...state,
                sendFriendRequestSuccessMsg: '',
                receiveANewFriendRequestMsg: '',
                receiveAConfirmFriendRequestMsg: '',
                receiveRefuseAddFriendRequestMsg: ''
            };

        default:
            return state;
    }
}