//格式化用户信息
exports.formatUserData = function (obj, key) {
    if (Array.isArray(key)) {
        key.map((k) => {
            delete obj[k];
        });
    } else {
        delete obj[key];
    }
    obj['userId'] = obj['_id'];
    delete obj['_id'];
    return obj;
};

//验证相关
exports.validFunc = {
    phoneNumber: function (phoneNumber) {
        return /^1[345789][\d]{9}$/g.test(phoneNumber);
    }
};