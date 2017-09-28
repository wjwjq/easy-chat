import { setItem, getItem, removeItem } from './storage';

export function isMessagesExpired() {
    const hasMessages = getItem('messages_data');
    return hasMessages && hasMessages['expires'] > Math.floor(Date.now() / 1000);
}

export function setMessages(messages) {
    messages && setItem('messages_data', JSON.stringify(messages));
}

export function getMessages() {
    const messages = getItem('messages_data');
    return messages && messages['messages'];
}

export function clearMessages() {
    removeItem('messages_data');
}