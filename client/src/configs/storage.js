// 返回本地存储对象方法
export default {
    setItem: function (key, value) {
        if (key && value) {
            localStorage.setItem(key, value);
        } else {
            key.length &&  key.map(function (item) {
                localStorage.setItem(item['key'], item['value']);
            });
        }
    },
    getItem: function () {
        const args = arguments;
        const len = args.length;
        if (!len) {
            throw new Error('at least needs one key params');
        }
        if (len === 1 ) {
            return localStorage.getItem(args[0]);
        }
        let maps = [];
        let key;
        for (let i = 0; i< len; i++) {
            key = args[i] ;
            maps.push({
                [key] : llocalStorage.getItem(key)
            });
        }
    }
};