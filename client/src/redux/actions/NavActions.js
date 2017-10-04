import {
    LEAVE_NAV
} from '../constant/';

//离开主导航
export function leaveNav(activeIndex) {
    return {
        type: LEAVE_NAV,
        payload: activeIndex
    };
}