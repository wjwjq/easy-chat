const initalState = {
    activeIndex: 0
};

import {
    LEAVE_NAV
} from '../constant/';

export default function reducers(state = initalState, action) {
    switch (action.type) {
        //离开主导航
        case LEAVE_NAV:
            return {
                ...state,
                activeIndex: action.payload
            };
        default:
            return state;
    }
}