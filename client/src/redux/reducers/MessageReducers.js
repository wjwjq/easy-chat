const initialState = {
    messages: [],
    fetching: false,
    fetched: false,
    error: null
};

export default function reducers(state = initialState, action) {
    
    switch (action.type) {

        case 'FETCH_MESSAGES':
            return {
                ...state,
                fetch: true
            };
        case 'FETCH_MESSAGES_REJECTED':
            return {
                ...state,
                fetch: false,
                error: action.payload
            };
        case 'FETCH_MESSAGES_FULFILLED':
            return {
                ...state,
                fetch: false,
                fetched: true,
                messages: action.payload
            };

        case 'ADD_MESSAGE_FULFILLED':
            return {
                ...state,
                messages: state.messages.filter((item) => {
                    if (item.userId === action.payload.userId) {
                        item.msgs.push(action.payload.data); 
                    }
                    return item;
                })
            };
        case 'ADD_MESSAGE_REJECTED':
            return {
                ...state,
                error: action.payload
            };

        case 'DELETE_MESSAGE_FULFILLED':
            return {
                ...state,
                messages: state.messages.filter((item) => {
                    if (item.userId === action.payload.userId) {
                        item.msgs = [];
                    }
                    return item;
                })
            };
        default:
            return state;
    }
}