const Token = require('../models//token');
const Users = require('../models/user');

const jwt = require('jsonwebtoken');
const credentials = require('../credentials');

//认证失败状态吗
const FAIL_RESPONSE = {
    'status': 401,
    'message': '身份验证失败，请重新登录'
};

exports.parseToken = parseToken = (req) => (req.body && req.body.access_token) || (req.query && req.query.access_token) || (req.headers['x-access-token']);



exports.verify = verify = (token, failCallback, successCallback) => {
    if (typeof failCallback !== 'function') {
        throw new Error(`second params 'failCallback' is required and must be a function`);
    }
    if (typeof successCallback !== 'function') {
        throw new Error(`third params 'successCallback' is required and must be a function`);
    }
    if (!token) {
        throw new Error(`first params 'token' is required`);
    }

    jwt.verify(token, credentials.token.secret, (err, decoded) => {
        if (err) {
            //已过期
            failCallback();
            return;
        }
        //去数据库查找token  是否存在
        Token
            .findOne({
                username: decoded.username
            }).then((data) => {
                if (data.token !== token) {
                    failCallback();
                    return;
                }
                successCallback(decoded.username);
            }).catch((err) => {
                if (err) {
                    failCallback();
                }
            });
    });
};

exports.autoSignin = (req, res, next) => {
    const token = parseToken(req);
    if (token) {
        verify(token, () => {
            res.json(FAIL_RESPONSE);
        }, (username) => {
            Users
                .findOne({
                    username
                }, {
                    '_id': 0,
                    'password': 0
                })
                .then((user) => {
                    if (user) {
                        return res.json({
                            'status': 200,
                            'message': '登录成功',
                            user
                        });
                    }
                    res.json({
                        'status': 401,
                        'message': '用户名不存在'
                    });
                })
                .catch((err) => {
                    if (err) {
                        console.info('error form autosigin token find', err);
                    }
                    return res.json({
                        'status': 401,
                        'message': '用户名不存在'
                    });
                });
        });
    } else {
        next();
    }
};

exports.verifyToken = (req, res, next) => {
    const token = parseToken(req);
    if (token) {
        verify(token, () => {
            res.json(FAIL_RESPONSE);
        }, (username) => {
            req.body.user = {
                username
            };
            next();
        });
    } else {
        res.json(FAIL_RESPONSE);
    }
};

exports.generatorToken = (username, password) => {
    const expires = Math.floor(Date.now() / 1000) + credentials.token.expires;
    const token = jwt.sign({
        username,
        password,
        exp: expires
    }, credentials.token.secret);
    const newToken = new Token();
    Object.assign(newToken, {
        token,
        username
    });
    removeToken(username);
    newToken.save((err) => {
        if (err) {
            console.info(`error from add newToken`, err);
        }
    });
    return {
        token,
        expires
    };
};

exports.removeToken = removeToken = (username) => {
    Token.remove({
        username
    }, (err) => {
        if (err) {
            console.info('error from remove token', err);
        }
    });
};