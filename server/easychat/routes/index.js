const tokenManager = require('../../middlewares/tokenManager');

//路由统一添加 管理
const auth = require('../handlers/auth');
const friends = require('../handlers/friends');
const messages = require('../handlers/messages');
const users = require('../handlers/users');
const upgradeYourBrowser = require('../handlers/upgradeYourBrowser');

module.exports = function (app) {

    //登录注册路由
    app.post('/api/auth/signin', tokenManager.autoSignin, auth.signin);
    app.post('/api/auth/signup', auth.signup);
    app.post('/api/auth/valid', auth.valid);
    app.get('/api/auth/query', users.show);

    //friends
    app.get('/api/friends/:id', tokenManager.verifyToken, friends.show);
    app.post('/api/friends/:id', tokenManager.verifyToken, friends.post);
    app.put('/api/friends/:id', tokenManager.verifyToken, friends.put);
    app.delete('/api/friends/:id', tokenManager.verifyToken, friends.delete);
    app.get('/api/friends', tokenManager.verifyToken, friends.index);

    //获取某个用户是否存在
    app.get('/api/users/:id/logout', tokenManager.removeToken, users.logout);
    app.get('/api/users/:id', tokenManager.verifyToken, users.show);
    app.post('/api/users/:id', tokenManager.verifyToken, users.post);
    app.put('/api/users/:id', tokenManager.verifyToken, users.put);
    app.delete('/api/users/:id', tokenManager.verifyToken, users.delete);
    app.get('/api/users', tokenManager.verifyToken, users.index);

    //messages
    //获取指定好友的消息列表
    app.get('/api/messages/:id', tokenManager.verifyToken, messages.show);
    //新建指定好友的消息列表
    app.post('/api/messages/:id', tokenManager.verifyToken, messages.post);
    //更新指定好友的消息列表
    app.put('/api/messages/:id', tokenManager.verifyToken, messages.put);
    //删除指定好友的消息列表
    app.delete('/api/messages/:id', tokenManager.verifyToken, messages.delete);
    //获取所有好友的消息列表
    app.get('/api/messages', tokenManager.verifyToken, messages.index);

    //提示浏览器升级
    app.get('/upgrade_your_browser', upgradeYourBrowser);
};