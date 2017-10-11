const { verifyToken, autoSignIn, removeToken } = require('../middlewares/tokenManager');

//路由统一添加 管理
const auth = require('../controllers/auth');
const friends = require('../controllers/friends');
const messages = require('../controllers/messages');
const users = require('../controllers/users');
const upgradeYourBrowser = require('../controllers/upgradeYourBrowser');

module.exports = function (app) {

    //登录注册路由
    app.post('/api/auth/signin', autoSignIn, auth.signin);
    app.post('/api/auth/signup', auth.signup);
    app.post('/api/auth/valid', auth.valid);

    //friends
    app.get('/api/friends/:id', verifyToken, friends.show);
    app.post('/api/friends/:id', verifyToken, friends.post);
    app.put('/api/friends/:id', verifyToken, friends.put);
    app.delete('/api/friends/:id', verifyToken, friends.delete);
    app.get('/api/friends', verifyToken, friends.index);

    //获取某个用户是否存在
    app.get('/api/users/:id/logout', removeToken, users.logout);
    app.get('/api/users/:id', verifyToken, users.show);
    app.post('/api/users/:id', verifyToken, users.post);
    app.put('/api/users/:id', verifyToken, users.put);
    app.delete('/api/users/:id', verifyToken, users.delete);
    app.get('/api/users', verifyToken, users.index);

    //messages
    //获取指定好友的消息列表
    app.get('/api/messages/:id', verifyToken, messages.show);
    //新建指定好友的消息列表
    app.post('/api/messages/:id', verifyToken, messages.post);
    //更新指定好友的消息列表
    app.put('/api/messages/:id', verifyToken, messages.put);
    //删除指定好友的消息列表
    app.delete('/api/messages/:id', verifyToken, messages.delete);
    //获取所有好友的消息列表
    app.get('/api/messages', verifyToken, messages.index);

    //提示浏览器升级
    app.get('/upgrade_your_browser', upgradeYourBrowser);
};