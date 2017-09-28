import { setItem, getItem, removeItem } from './storage';

export function isFriendsExpired() {
    const hasFriends = getItem('friends_data');
    return hasFriends && hasFriends['expires'] > Math.floor(Date.now() / 1000);
}

export function setFriends(friends) {
    friends && setItem('friends_data', JSON.stringify(friends));
}

export function getFriends() {
    const friends = getItem('friends_data');
    return friends && Friends['friends'];
}

export function clearFriends() {
    removeItem('friends_data');
}