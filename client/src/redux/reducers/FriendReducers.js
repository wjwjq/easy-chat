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

        case 'FETCH_FRIENDS':
            return {
                ...state,
                fetch: true
            };
        case 'FETCH_FRIENDS_REJECTED':
            return {
                ...state,
                fetch: false,
                error: action.payload
            };
        case 'FETCH_FRIENDS_FULFILLED':
            return {
                ...state,
                fetch: false,
                fetched: true,
                friends: action.payload
            };

        case 'ADD_FRIEND': 
            return {
                ...state,
                adding: true,
                added: false
            };
        case 'ADD_FRIEND_REJECTED':
            return {
                ...state,
                adding: false,
                added: false,
                error: action.payload
            };
        case 'ADD_FRIEND_FULFILLED':
            return {
                ...state,
                adding: false,
                added: true,
                friends: state.friends.map((friend) => {
                    if (friend.userId === action.payload.userId){
                        return action.payload.data;
                    } else {
                        return friend;
                    }
                })
            };

        case 'UPDATE_FRIEND': 
            return {
                ...state,
                updating: true,
                updated: false
            };
        case 'UPDATE_FRIEND_REJECTED':
            return {
                ...state,
                updating: false,
                updated: false,
                error: action.payload
            };
        case 'UPDATE_FRIEND_FULFILLED':
            return {
                ...state,
                updating: false,
                updated: true,
                friends:state.friends.map((friend) => {
                    if (friend.userId === action.payload.userId){
                        return action.payload.data;
                    } else {
                        return friend;
                    }
                })
            };

        case 'DELETE_FRIEND':
            return {
                ...state,
                deleting: true,
                deleted: false
            };
        case 'DELETE_FRIEND_REJECTED': 
            return {
                ...state,
                deleting: false,
                deleted: false,
                error: action.payload
            };
        case 'DELETE_FRIEND_FULFILLED': 
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
