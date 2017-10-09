import io from 'socket.io-client';
let socket = null;

export function socketConnect(url, path, accessToken) {
    socket = io(url, {
        path: path,
        transportOptions: {
            polling: {
                extraHeaders: {
                    'x-access-token': accessToken
                }
            }
        }
    });
}

export function onPostMessage(msg) {
    try {
        socket.emit('postMessage', msg);
    } catch (err) {
        console.info(err);
    }
}

export function onReceiveMessage(cb) {
    try {
        socket.on('receiveMessage', (chunk) => typeof cb === 'function' && cb(chunk) );
    } catch (err) {
        // console.info(err);
        setTimeout(() => onReceiveMessage(cb), 2000);
    }
}

export function disconnect() {
    socket.emit('disconnecting');
}