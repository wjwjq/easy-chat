const initalState = {
    user: {},
    valid: '',
    logining: '',
    logined: '',
    error: ''
};

export default function reducers(state = initalState, action) {
    switch (action.type) {
        case 'LOGIN_REJECTED':
            return {
                ...state,
                logining: false,
                error: action.payload
            };
        case 'LOGIN_FULFILLED':
            return {
                ...state,
                logined: true,
                user: action.payload
            };
        default:
            return state;
    }
}