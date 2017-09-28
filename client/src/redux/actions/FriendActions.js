import axios from 'axios';
import api from '../../configs/api';
import { authFail } from './AuthActions';
import { setFriends } from '../../handlers/friends';
import {
    FETCH_FRIENDS,
    FETCH_FRIENDS_REJECTED,
    FETCH_FRIENDS_FULFILLED,
    QUERY_FRIEND,
    QUERY_FRIEND_REJECTED,
    QUERY_FRIEND_FULFILLED,
    ADD_FRIEND_REJECTED,
    ADD_FRIEND_FULFILLED,
    UPDATE_FRIEND_REJECTED,
    UPDATE_FRIEND_FULFILLED,
    DELETE_FRIEND_REJECTED,
    DELETE_FRIEND_FULFILLED,
    DELETE_MESSAGE_FULFILLED
} from '../constant/';

//获取当期用户所有的好友
export function fetchFriends() {
    return (dispatch) =>  {
        dispatch({
            type: FETCH_FRIENDS
        });
        axios
            .get(`${api.friends}`)
            .then((res) => {
                if (res.data.status === 401) {
                    dispatch(authFail(res.data.message));
                    return; 
                }
                if (res.data.status === 200) {
                    const { friends } =res.data;
                    setFriends(friends);
                    dispatch({
                        type: FETCH_FRIENDS_FULFILLED,
                        payload: friends
                    });
                } else {
                    dispatch({
                        type: FETCH_FRIENDS_REJECTED,
                        payload: res.data.message
                    });
                }
            })
            .catch((err) =>
                dispatch({
                    type: FETCH_FRIENDS_REJECTED,
                    payload: err.message
                })
            );
    };
}

//查询某个用户信息
export function queryFriend(friendId) {
    return  (dispatch) => {
        dispatch({
            type: QUERY_FRIEND
        });
        axios
            .get(`${api.friends}/${friendId}`)
            .then((res) => {
                if (res.data.status === 401) {
                    dispatch(authFail(res.data.message));
                    return; 
                }
                if (res.data.status === 204) {
                    dispatch({
                        type: QUERY_FRIEND_REJECTED,
                        payload: res.data.message
                    });
                }
                if (res.data.status === 200) {
                    dispatch({
                        type: QUERY_FRIEND_FULFILLED,
                        payload: res.data.friend
                    });
                } else {
                    dispatch({
                        type: QUERY_FRIEND_REJECTED,
                        payload: res.data.message
                    });
                }
            })
            .catch((err) => dispatch({
                type: QUERY_FRIEND_REJECTED,
                payload: err.message
            }));
    };
}

//添加好友
export function addFriend(friendId) {
    return (dispatch) => {
        axios
            .post(`${api.friends}/${friendId}`)
            .then((res) => {
                if (res.data.status === 401) {
                    dispatch(authFail(res.data.message));
                    return; 
                }
                if (res.data.status === 200) {
                    dispatch({
                        type: ADD_FRIEND_FULFILLED,
                        payload: {
                            friend: res.data.friend,
                            message: res.data.message
                        }
                    });
                } else {
                    dispatch({
                        type: ADD_FRIEND_REJECTED,
                        payload: res.data.message
                    });
                }
            })
            .catch((err) => dispatch({
                type: ADD_FRIEND_REJECTED,
                payload: err.message
            }));
    };
}

//更新信息好友
export function updateFriend(userId, data) {
    return  (dispatch) => {
        axios
            .put(`${api.friends}/${userId}`, {
                data
            })
            .then((res) => {
                if (res.data.status === 401) {
                    dispatch(authFail(res.data.message));
                    return; 
                }
                if (res.data.status === 200) {
                    dispatch({
                        type: UPDATE_FRIEND_FULFILLED,
                        payload: res.data.message
                    });
                } else {
                    dispatch({
                        type: UPDATE_FRIEND_REJECTED,
                        payload: res.data.message
                    });
                }
            })
            .catch((err) => dispatch({
                type: UPDATE_FRIEND_REJECTED,
                payload: err.message
            }));
    };
}

//删除好友
export function deleteFriend(friendId) {
    return (dispatch) => {
        axios
            .delete(`${api.friends}/${friendId}`)
            .then((res) => {
                if (res.data.status === 401) {
                    dispatch(authFail(res.data.message));
                    return; 
                }
                if (res.data.status === 200) {
                    dispatch({
                        type: DELETE_MESSAGE_FULFILLED,
                        payload: {
                            friendId
                        }
                    });
                    dispatch({
                        type: DELETE_FRIEND_FULFILLED,
                        payload: {
                            friendId,
                            message: res.data.message
                        }
                    });
                } else {
                    dispatch({
                        type: DELETE_FRIEND_REJECTED,
                        payload: res.data.message
                    });
                }
            })
            .catch((err) => dispatch({
                type: DELETE_FRIEND_REJECTED,
                payload: err.message
            }));
    };
}