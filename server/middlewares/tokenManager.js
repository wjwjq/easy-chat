const Token = require('../models//token');
const Users = require('../models/user');

const formatUserData = require('../utils/').formatUserData;
const jwt = require('jsonwebtoken');
const credentials = require('../credentials');

const parseToken = (req) => (req.body && req.body.access_token) || (req.query && req.query.access_token) || (req.headers['x-access-token']);

exports.autoSignin = function (req, res, next) {
    const token = parseToken(req);
    console.info('recieve token', token);
    if (token) {
        jwt.verify(token, credentials.token.secret, function (err, decoded) {
            if (err) {
                //已经过期
                console.info('error from autoSignin', err);
                return res.json({
                    'status': 401, //认证失败状态吗
                    'message': 'Auto authentication fail, Access_token is expired'
                });
            }
            //去数据库查找token  是否存在
            Token
                .findOne({
                    username: decoded.username
                })
                .then(function (data) {
                    if (data.token === token) {
                        Users
                            .findOne({
                                username: decoded.username
                            })
                            .then(function (user) {
                                // setTimeout(function () {
                                return res.json({
                                    'status': 200,
                                    'message': '登录成功',
                                    'user': formatUserData(user._doc, 'password')
                                });
                                // }, 1000);
                            })
                            .catch(function (err) {
                                if (err) {
                                    console.info('error form autosigin token find', err);
                                }
                            });

                    } else {
                        res.json({
                            'status': 401,
                            'message': 'Authentication fail,  Access_token is expired'
                        });
                    }
                }).catch(function (err) {
                    if (err) {
                        return res.json({
                            'status': 401,
                            'message': 'Authentication fail,  Access_token is expired'
                        });
                    }
                });
        });
    } else {
        next();
    }
};

exports.verifyToken = function (req, res, next) {
    const token = parseToken(req);
    if (token) {
        jwt.verify(token, credentials.token.secret, function (err, decoded) {
            if (err) {
                //已过期
                console.info('error form verifyToken first error');
                return res.json({
                    'status': 401, //认证失败状态哦码
                    'message': 'Authentication fail，Access_token is expired'
                });
            }

            //去数据库查找token  是否存在
            Token
                .findOne({
                    username: decoded.username
                })
                .then(function (data) {
                    if (data.token === token) {
                        next();
                    } else {
                        res.json({
                            'status': 401,
                            'message': 'Authentication fail,  Access_token is expired'
                        });
                    }
                }).catch(function (err) {
                    if (err) {
                        return res.json({
                            'status': 401,
                            'message': 'Authentication fail'
                        });
                    }
                });
        });
    }
};

exports.generatorToken = function (username, password) {
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
    Token.remove({
        username
    }, function (err) {
        if (err) {
            console.info('error from remove token', err);
        }
    });
    newToken.save(function (err) {
        if (err) {
            console.info(`error from add newToken`, err);
        }
    });
    return {
        token,
        expires
    };
};
exports.removeToken = function (req, res, next) {
    Token.remove({
        token
    }, function (err) {
        if (err) {
            console.info('form removeToken', err);
            next();
        }
    });
    next();
};