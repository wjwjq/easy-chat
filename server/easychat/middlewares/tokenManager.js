const Token = require('../models//token');

const {
    comparePassword,
    queryUser
} = require('../models/user');

const jwt = require('jsonwebtoken');
const credentials = require('../../credentials');

const {
    TOKEN_EXPIRED,
    TOKEN_NOT_EXISTED,
    TOKEN_AUTHENTICATION_FAIL,
    USER_NOT_EXISTED,
    USER_AUTH_FAIL
} = require('../constant/status');

const FAIL_RESPONSE = {
    'status': 401,
    'message': '身份验证失败，请重新登录'
};

//解析查找token
exports.parseToken = parseToken = req => {
    return new Promise((resolve, reject) => {
        const accessToken = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
        if (accessToken) {
            resolve(accessToken);
        } else {
            reject(TOKEN_NOT_EXISTED);
        }
    });
};

//解析验证token
exports.verify = verify = token => {
    return new Promise((resolve, reject) => {
        //验证token
        jwt.verify(token, credentials.token.secret, (err, decoded) => {
            if (err) {
                //已过期
                return reject(TOKEN_EXPIRED);
            }
            //去数据库查找token  是否存在
            Token
                .findOne({
                    username: decoded.username
                })
                .then(data => {
                    if (data.token !== token) {
                        return reject(TOKEN_AUTHENTICATION_FAIL);
                    }
                    resolve({
                        username: decoded.username,
                        password: decoded.password
                    });
                })
                .catch(err => {
                    console.info('find token error ', err);
                    return reject(TOKEN_AUTHENTICATION_FAIL);
                });
        });
    });
};

//自动登录
exports.autoSignIn = (req, res, next) => {
    let decodedPassword = '';
    parseToken(req)
        .then(token => verify(token))
        .then(loginInfo => {
            decodedPassword = loginInfo.password;
            const query = {
                username: loginInfo.username
            };
            const populate = {
                latestFriendRequest: 0,
                latestMessages: 0,
                friends: 0
            };
            return queryUser({
                query,
                populate
            });
        })
        .then(user => {
            //密码验证
            return comparePassword(user, decodedPassword);
        }).then(data => {
            res.json({
                'status': 200,
                'message': '登录成功',
                ...data
            });
        }).catch(err => {
            switch (err) {
                case TOKEN_NOT_EXISTED:
                    return next();
                case USER_NOT_EXISTED:
                    return res.json({
                        'status': 401,
                        'message': '用户名不存在'
                    });
                case TOKEN_EXPIRED:
                    return res.json({
                        'status': 401,
                        'message': '有效身份已过期，请重新登录'
                    });
                case TOKEN_AUTHENTICATION_FAIL:
                    return res.json(FAIL_RESPONSE);
                case USER_AUTH_FAIL:
                    return res.json({
                        'status': 401,
                        'message': '账号或密码不正确'
                    });
                default:
                    console.info('auto Sign In fail error ', err);
            }
        });
};

//验证token中间件
exports.verifyToken = (req, res, next) => {
    parseToken(req)
        .then(token => verify(token))
        .then(user => {
            req.body.user = {
                username: user.username
            };
            next();
        }).catch(err => {
            switch (err) {
                case TOKEN_NOT_EXISTED:
                    return res.json(FAIL_RESPONSE);
                case TOKEN_AUTHENTICATION_FAIL:
                    return res.json(FAIL_RESPONSE);
                default:
                    console.info('verify token error', err);
            }
        });
};

//生成token
exports.generateToken = (username, password) => {
    const expires = Math.floor(Date.now() / 1000) + credentials.token.expires;

    const token = jwt.sign({
        username,
        password,
        exp: expires
    }, credentials.token.secret);

    const doc = {
        token,
        username
    };

    Token.update({
        username
    }, doc, {
        upsert: true
    }, err => {
        if (err) {
            console.info(`error from add newToken`, err);
        }
    });

    return token;
};

//删除token
exports.removeToken = username => {
    Token.remove({
        username
    }, err => {
        if (err) {
            console.info('error from remove token', err);
        }
    });
};