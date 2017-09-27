
//验证相关
exports.validFunc = {
    phoneNumber: function (phoneNumber) {
        return /^1[345789][\d]{9}$/g.test(phoneNumber);
    }
};