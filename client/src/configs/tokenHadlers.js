import { setItem, getItem, removeItem } from './storage';
export function isTokenExpired() {
    const hasAccessToken = getItem('access_token');
    return hasAccessToken && hasAccessToken['expires'] > Math.floor(Date.now() / 1000);
}
export function setToken(token) {
    token && setItem('access_token', JSON.stringify(token));
}
export function getToken() {
    const accessToken = getItem('access_token');
    return accessToken && accessToken['token'];
}
export function clearToken() {
    removeItem('access_token');
}