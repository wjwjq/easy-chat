const mongoose = require('mongoose');

//引入状态常量
const { 
    CODE_EXPIRED, 
    CODE_NOT_EQUAL,
    CODE_NOT_FIND, 
    CODE_VALID_SUCCESS,
    SAVE_CODE_SUCCESS
} = require('../constant/status');

const verifyCodeSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    code: String,
    expires: String
});

const VerifyCode = mongoose.model('VerifyCode', verifyCodeSchema);

//保存验证码
exports.saveVerifyCode = function (username, code) {
    return new Promise((resolve, reject) => {
        const condition = { username };
        const doc = { username, code, expires: Date.now() / 1000 + 60 * 30 };
        const valid = { upsert: true };
        const callback = (err) => {
            if (err) {
                console.info('save code err', err);
                return reject(SAVE_CODE_FAIL);
            }
            resolve(SAVE_CODE_SUCCESS);
        };
        VerifyCode.update(condition, doc, valid, callback);
    });
};

//获取验证码
function getVerifyCode(username) {
    return new Promise((resolve, reject) => {
        VerifyCode
            .findOne({
                username
            })
            .then((doc) => {
                try {
                    if (doc['expires'] < Date.now() / 1000)
                        return reject(CODE_EXPIRED);
                } catch (err) {
                    return reject(CODE_NOT_FIND);
                }
                resolve(doc.code);
            })
            .catch(() => { 
                reject(CODE_NOT_FIND); 
            });
    });
}

//验证码比较
function compareVerifyCode(codeInDB, code) {
    return new Promise((resolve, reject) => {
        if (codeInDB === code) {
            return resolve(CODE_VALID_SUCCESS);
        }
        reject(CODE_NOT_EQUAL);
    });
}

//验证验证码
exports.validVerifyCode = async function (username, code) {
    let r;
    try {
        r = await getVerifyCode(username);
        r = await compareVerifyCode(r, code);
    } catch (err) {
        return Promise.reject(err);
    }
    return r;
};

//移除存储的验证码
exports.removeVerifyCode = function (username) {
    VerifyCode.remove({
        username
    }, function (err) {
        console.info('remove VerifyCode err', err);
    });
};


