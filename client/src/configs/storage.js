// 返回本地存储对象方法

export function setItem(key, value) {
    if (key && value) {
        localStorage.setItem(key, value);
    } else {
        Array.isArray(key) &&  key.map(function (item) {
            localStorage.setItem(item['key'], item['value']);
        });
    }
}

export function getItem() {
    const args = arguments;
    const len = args.length;
    if (!len) {
        throw new Error('at least needs one key params');
    }
    if (len === 1 ) {
        return JSON.parse(localStorage.getItem(args[0]));
    }
    let maps = [];
    let key;
    for (let i = 0; i< len; i++) {
        key = args[i] ;
        maps.push({
            [key] : JSON.parse(localStorage.getItem(key))
        });
    }
    return maps;
}

export function  removeItem(key) {
    if (Array.isArray(key)) {
        key.map(function (k) {
            localStorage.removeItem(k);
        });
    } else {
        localStorage.removeItem(key);
    }
}