//路由统一添加 管理
const auth = require('../handlers/auth');
const friends = require('../handlers/friends');
const messages = require('../handlers/messages');
const upgradeYourBrowser = require('../handlers/upgradeYourBrowser');

module.exports = function (app) {

    //登录注册路由
    app.post('/api/auth/signin', auth.signin);
    app.post('/api/auth/signup', auth.signup);
    app.post('/api/auth/valid', auth.valid);

    //friends
    app.get('/api/friends/:id', friends.getFriend);
    app.post('/api/friends/:id', friends.postFriend);
    app.put('/api/friends/:id', friends.putFriend);
    app.delete('/api/friends/:id', friends.deleteFriend);
    app.get('/api/friends', friends.getFriends);
  

    //messages
    app.get('/api/messages/:id', messages.getMessage);
    app.post('/api/messages/:id', messages.postMessage);
    app.delete('/api/messages/:id', messages.deleteMessage);
    app.get('/api/messages', messages.getMessages);

    //提示浏览器升级
    app.get('/upgrade_your_browser', upgradeYourBrowser);
};