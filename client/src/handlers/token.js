import { setItem, getItem, removeItem } from './storage';

export function setToken(token) {
    token && setItem('access_token', JSON.stringify(token));
}

export function getToken() {
    return getItem('access_token');
}

export function clearToken() {
    removeItem('access_token');
}