const Token = require('../models//token');
const Users = require('../models/user');

const jwt = require('jsonwebtoken');
const credentials = require('../credentials');

const parseToken = (req) => (req.body && req.body.access_token) || (req.query && req.query.access_token) || (req.headers['x-access-token']);

//认证失败状态吗
const FAIL_RESPONSE = {
    'status': 401, 
    'message': '身份验证失败，请重新登录'
};

exports.autoSignin = (req, res, next) => {
    const token = parseToken(req);
    if (token) {
        jwt.verify(token, credentials.token.secret, (err, decoded) => {
            if (err) {
                //已经过期
                console.info('error from autoSignin', err);
                return res.json(FAIL_RESPONSE);
            }
            //去数据库查找token  是否存在
            Token
                .findOne({
                    username: decoded.username
                })
                .then((data) => {
                    if (data.token === token) {
                        Users
                            .findOne({
                                username: decoded.username
                            }, {
                                '_id': 0,
                                'password': 0
                            })
                            .then((user) => {
                                // setTimeout( () => {
                                return res.json({
                                    'status': 200,
                                    'message': '登录成功',
                                    user
                                });
                                // }, 1000);
                            })
                            .catch((err) => {
                                if (err) {
                                    console.info('error form autosigin token find', err);
                                }
                            });

                    } else {
                        res.json(FAIL_RESPONSE);
                    }
                }).catch((err) => {
                    if (err) {
                        return res.json(FAIL_RESPONSE);
                    }
                });
        });
    } else {
        next();
    }
};

exports.verifyToken = (req, res, next) => {
    const token = parseToken(req);
    if (token) {
        jwt.verify(token, credentials.token.secret, (err, decoded) => {
            if (err) {
                //已过期
                console.info('error form verifyToken first error');
                return res.json(FAIL_RESPONSE);
            }

            //去数据库查找token  是否存在
            Token
                .findOne({
                    username: decoded.username
                })
                .then((data) => {
                    if (data.token === token) {
                        req.body.user = { username: decoded.username };
                        next();
                    } else {
                        res.json(FAIL_RESPONSE);
                    }
                }).catch((err) => {
                    if (err) {
                        return res.json(FAIL_RESPONSE);
                    }
                });
        });
    } else {
        return res.json(FAIL_RESPONSE);
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