// 返回本地存储对象方法
export default {
    setItem: function () {
        const args = Aarry.prototype.slice(arguments);
        const len = args.length;
        if (Object.prototype.toString()) {
            args.map(function (item) {
                localStorage.setItem(item['key'], item['value']);
            });
        } else {
            if (len < 2) {
                throw new Error('need two params; one for key, another for value');
            }
            localStorage.setItem(args[0], args[1]);
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