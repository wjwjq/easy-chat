// const publicKey = 'easychat';
const crypto = require('crypto');
export default {
    password: function (password) {
        const sha1 = crypto.createHash('sha1');
        sha1.update(password);
        return sha1.digest('hex');
    }
};
