import api from '../../configs/api';
import axios from 'axios';

export function login(loginInfo){
    return function (dispatch){
        axios
            .post(api.auth,{
                data: loginInfo
            })
            .then((res) => {
          
                if (res.data.status === 'ok'){
                    // const token = res.data.token
                    // localStorage.setItem('jwtToken', token)
                    // setAuthorizationToken(token)
                    // dispatch(setCurrentUser(jwtDecode(token)))
                    dispatch({
                        type: 'LOGIN_FULFILLED',
                        payload: Object.assign({}, loginInfo.user, res.data.user)
                    });
                    //todo: setCookies Or localStorage
                } else {
                    dispatch({
                        type: 'LOGIN_REJECTED',
                        payload: res.error
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: 'LOGIN_REJECTED',
                    payload: err.message
                });
            });        
    };
}

export function getLoginValid(username){
    return function (dispatch){
        axios
            .post(`${api.user}/${user.username}`,{
                data: user
            })
            .then((res) => {
                if (res.data.status === 'ok'){
                    dispatch({
                        type: 'GET_VALID_FULFILLED',
                        payload: assgin({}, username, res.data.user)
                    });
                    //todo: setCookies Or localStorage
                } else {
                    dispatch({
                        type: 'LOGIN_REJECTED',
                        payload: res.error
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: 'LOGIN_REJECTED',
                    payload: err.message
                });
            });        
    };
}