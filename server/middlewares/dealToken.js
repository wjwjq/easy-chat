const jwt = require('jsonwebtoken');
const credentials =  require('../credentials');
const parseToken = (req) =>  (req.body &&  req.body.access_token) || (req.query && req.query.access_token) || (req.headers['x-access-token']);
exports.hasToken = function (token) {
    /* todo: 1. 验证token是否存在
     *         2. token是否过期
     *过期或者不存在 返回 {
     *    'status': 401,  //认证失败状态哦码
     *    'message': 'Authentication fail'
     * }
     * 客户端重新登录
     * 存在 直接返回 返回ture
     **/ 
};

exports.removeToken = function (req, res, next) {
    next();
};

exports.verifyToken = function (req, res, next) {
    const token = parseToken(req);
    console.info('token', token);
    if (token) {
        if (hasToken(token)) {
        }
        jwt.verify(token, credentials.token.secret, function (err, decoded) {
            if (err) {
                res.json({
                    'status': 401,  //认证失败状态哦码
                    'message': 'Authentication fail'
                });
                return next(err);
            }
            next();
        });
    }
};
