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

exports.validFunc = {
    phoneNumber: function (phoneNumber) {
        return /assxx/g.test(phoneNumber);
    }
};