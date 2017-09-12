import axios from 'axios';
import api  from '../../configs/api';

export function fetchMessages() {
    return function (dispatch){
        axios
            .get(api.messages)
            .then((res) => {
                dispatch({
                    type: 'FETCH_MESSAGES_FULFILLED',
                    payload: res.data
                });
            }
            )
            .catch((err) =>
                dispatch({
                    type: 'FETCH_MESSAGES_REJECTED',
                    payload: err
                })
            );
    }; 
}

export function addMessage(userId, data) {
    // return function (dispatch){
    //     axios
    //         .post(`${api.messages}/${userId}`,{
    //             data
    //         })
    //         .then((res) => {
    //             if (res.status === 'ok') {
    //                 dispatch({
    //                     type: 'ADD_MESSAGE_FULFILLED',
    //                     payload: {
    //                         userId,
    //                         data
    //                     }
    //                 });
    //             } else {
    //                 dispatch({
    //                     type: 'ADD_MESSAGE_REJECTED',
    //                     payload: err
    //                 });
    //             }
    //         })
    //         .catch((err) => dispatch({
    //             type: 'ADD_MESSAGE_REJECTED',
    //             payload: err
    //         }));
    // };
    
    return {
        type: 'ADD_MESSAGE_FULFILLED',
        payload: {
            userId,
            data
        }
    };
}


export function deleteMessage(userId) {
    return {
        type: 'DELETE_MESSAGE_FULFILLED',
        payload: {
            userId
        }
    };
}
