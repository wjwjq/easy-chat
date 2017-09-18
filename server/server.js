const http = require('http');
const path = require('path');
const favicon = require('serve-favicon');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const vhost = require('vhost');

global.dbHelper = require('./mongodb/dbHelper');

// const Users = global.dbHelper.getModel('users');
// const user = new Users();
// Object.assign(user, {
//     'address': '四川 成都',
//     'avatarUrl': '',
//     'gender': 1,
//     'nickname': 'test A-1',
//     'order': 'A',
//     'password': '',
//     'remark': '风',
//     'telephone': '18990655830',
//     'userId': '5',
//     'username': 'eagle@easychat.com'
// });
// user.save((err) => {
//     console.info(err);
// });
// Users.find({}, (err, data) => {
//     console.info(data);
// });

const app = express();

app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));


var admin = express.Router();
app.use(vhost('admin.*', admin));

// create admin routes; these can be defined anywhere
admin.get('/', (req, res) => {
    res.send('hello admin');
});

var easychat = express.Router();
app.use(vhost('easychat.*', easychat));
easychat.post('/api/messages/:id', (req, res) => {
    const data = {
        status: 'ok'
    };
    res.json(data);
});

easychat.get('/api/messages', (req, res) => {
    const data = [{
        'userId': '1',
        'msgs': [{
            'from': 1,
            'content': '哈哈哈，这是第一条内容,哈哈哈，这是第一条内容,哈哈哈，这是第一条内容,哈哈哈，这是第一条内容!',
            'publishTime': '2017-09-11 18:27:30'
        }, {
            'from': 0,
            'content': '哈哈哈，这是第二条内容',
            'publishTime': '2017-09-11 18:27:32'
        }]
    }, {
        'userId': '2',
        'msgs': [{
            'from': 1,
            'content': '哈哈哈，这是第二条内容',
            'publishTime': '2017-09-11 18:21:30'
        }]
    }, {
        'userId': '3',
        'msgs': [{
            'from': 1,
            'content': '哈哈哈，这是第三条内容',
            'publishTime': '2017-09-10 18:27:30'
        }]
    }, {
        'userId': '4',
        'msgs': [{
            'from': 1,
            'content': '哈哈哈，这是第4条内容',
            'publishTime': '2017-09-1 18:27:30'
        }]
    }];

    setTimeout(() => {
        res.json(data);
    }, 1000);
});

easychat.post('/api/friends/:id', (req, res) => {
    const data = {
        'status': 'ok',
        'user': {
            'address': '四川 成都',
            'avatarUrl': '',
            'gender': 0,
            'nickname': 'test A-1',
            'order': 'A',
            'password': '',
            'remark': '风',
            'telephone': '18990655830',
            'userId': '5',
            'username': 'eagle@easychat.com'
        }
    };
    res.json(data);
});

easychat.get('/api/friends', (req, res) => {
    const data = [{
        'address': '四川 成都',
        'avatarUrl': '',
        'gender': 0,
        'nickname': 'test A-1',
        'order': 'A',
        'remark': '风',
        'telephone': '18990655830',
        'userId': '1',
        'username': '18990655830'
    }, {
        'address': '',
        'avatarUrl': '/images/avatar.png',
        'gender': 1,
        'nickname': 'test A-2',
        'order': 'B',
        'remark': '',
        'telephone': '',
        'userId': '2',
        'username': 'wjwjq456@qq.com'
    }, {
        'address': '',
        'avatarUrl': '',
        'gender': 1,
        'nickname': 'test B-1',
        'order': 'A',
        'remark': '',
        'telephone': '',
        'userId': '3',
        'username': 'wjq@eagle.com'
    }, {
        'address': '',
        'avatarUrl': '/images/avatar.png',
        'gender': 0,
        'nickname': 'test B-2',
        'order': 'B',
        'remark': '',
        'telephone': '',
        'userId': '4',
        'username': 'eagleagle@qq.com'
    }];

    setTimeout(() => {
        res.json(data);
    }, 300);
});

easychat.post('/api/users', (req, res) => {

});

easychat.post('/api/auth/valid', (req, res) => {
    const data = {
        'status': 'ok',
        'token': '123456aavss',
        'valid': '123456',
        'exprires': '300'
    };
    res.send(data);
});

easychat.post('/api/auth/signup', (req, res) => {
    const data = {
        'status': 'ok',
        'error': '',
        'token': '123456aavss'
    };
    res.send(data);
});
easychat.post('/api/auth/signin', (req, res) => {
    const body = req.body;
    console.info(body);
    const Users = dbHelper.getModel('users');
    const user = new Users();
    Object.assign(user, body);
    user.save().then((err, msg) => {
        console.info(msg);
        let data;
        if (err) {
            data = {
                'status': 'error',
                'error': '注册失败'
            };
        } else {
            data = {
                'status': 'ok',
                'error': ''
            };
        }
        res.send(data);
    });
});

// create easychat routes; these can be defined anywhere
easychat.get('*', (req, res) => {
    console.info('loading from easychat domain');
    res.sendFile(path.resolve(__dirname) + '/public/easychat/index.html');
});

app.post('/api/messages/:id', (req, res) => {
    const data = {
        status: 'ok'
    };
    res.json(data);
});

app.get('/api/messages', (req, res) => {
    const data = [{
        'userId': '1',
        'msgs': [{
            'from': 1,
            'content': '哈哈哈，这是第一条内容,哈哈哈，这是第一条内容,哈哈哈，这是第一条内容,哈哈哈，这是第一条内容!',
            'publishTime': '2017-09-11 18:27:30'
        }, {
            'from': 0,
            'content': '哈哈哈，这是第二条内容',
            'publishTime': '2017-09-11 18:27:32'
        }]
    }, {
        'userId': '2',
        'msgs': [{
            'from': 1,
            'content': '哈哈哈，这是第二条内容',
            'publishTime': '2017-09-11 18:21:30'
        }]
    }, {
        'userId': '3',
        'msgs': [{
            'from': 1,
            'content': '哈哈哈，这是第三条内容',
            'publishTime': '2017-09-10 18:27:30'
        }]
    }, {
        'userId': '4',
        'msgs': [{
            'from': 1,
            'content': '哈哈哈，这是第4条内容',
            'publishTime': '2017-09-1 18:27:30'
        }]
    }];

    setTimeout(() => {
        res.json(data);
    }, 1000);
});

app.post('/api/friends/:id', (req, res) => {
    const data = {
        'status': 'ok',
        'user': {
            'address': '四川 成都',
            'avatarUrl': '',
            'gender': 0,
            'nickname': 'test A-1',
            'order': 'A',
            'password': '',
            'remark': '风',
            'telephone': '18990655830',
            'userId': '5',
            'username': 'eagle@easychat.com'
        }
    };
    res.json(data);
});

app.get('/api/friends', (req, res) => {
    const data = [{
        'address': '四川 成都',
        'avatarUrl': '',
        'gender': 0,
        'nickname': 'test A-1',
        'order': 'A',
        'remark': '风',
        'telephone': '18990655830',
        'userId': '1',
        'username': '18990655830'
    }, {
        'address': '',
        'avatarUrl': '/images/avatar.png',
        'gender': 1,
        'nickname': 'test A-2',
        'order': 'B',
        'remark': '',
        'telephone': '',
        'userId': '2',
        'username': 'wjwjq456@qq.com'
    }, {
        'address': '',
        'avatarUrl': '',
        'gender': 1,
        'nickname': 'test B-1',
        'order': 'A',
        'remark': '',
        'telephone': '',
        'userId': '3',
        'username': 'wjq@eagle.com'
    }, {
        'address': '',
        'avatarUrl': '/images/avatar.png',
        'gender': 0,
        'nickname': 'test B-2',
        'order': 'B',
        'remark': '',
        'telephone': '',
        'userId': '4',
        'username': 'eagleagle@qq.com'
    }];

    setTimeout(() => {
        res.json(data);
    }, 300);
});
const valid = '1234';
app.post('/api/auth/valid', (req, res) => {
    const data = {
        'status': 'ok',
        'token': '123456aavss',
        'valid': '123456',
        'exprires': '300'
    };
    res.send(data);
});

//登录
app.post('/api/auth/signin', (req, res) => {
    const userInfo = req.body.data.user;
    const postValid = req.body.data.valid;
    if (postValid === valid) {
        const Users = dbHelper.getModel('users');
        Users.findOne({ username: userInfo.username },function (err, user) {
            let data;
            if (err) {
                data = {
                    'status': 'error',
                    'error': '登录失败'
                };
            } 
            if (user && user.password === userInfo.password) {
                data = {
                    'status': 'ok',
                    'error': '',
                    'token': 'aaa1234'
                };
            } else {
                data = {
                    'status': 'error',
                    'error': '账号或密码错误'
                };
            }
            res.send(data);
        });
    } else {
        res.send({
            'status': 'error',
            'error': '验证码已过期或错误'
        });
    }
});
//注册
app.post('/api/auth/signup', (req, res) => {
    const userInfo = req.body.data.user;
    const postValid = req.body.data.valid;
    if (postValid === valid) {
        const Users = dbHelper.getModel('users');
        const user = new Users();
        Object.assign(user, userInfo);
        user.save((err, msg) => {
            console.info(msg);
            let data;
            if (err) {
                data = {
                    'status': 'error',
                    'error': '注册失败'
                };
            } else {
                data = {
                    'status': 'ok',
                    'error': ''
                };
            }
            res.send(data);
        });
    } else {
        res.send({
            'status': 'error',
            'error': '验证码已过期或错误'
        });
    }
});

//出现无限死循环 应改为前端渲染
app.get('/upgrade_your_browser', (req, res) => {
    res.render('upgrade_your_browser_min');
});


//网站主页
app.get('/', (req, res) => {
    res.locals.title = 'server';
    // res.render('index');
    res.redirect('http://easychat.localhost:3000/welcome');
});

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


function startServer() {
    server = http.createServer(app).listen(app.get('port'), function () {
        console.info(`Server started in ${app.get('env')}  mode on http://localhost:${app.get('port')}; press Ctrl-C to terminate.`);
    });
}

if (require.main === module) {
    startServer();
} else {
    module.exports = startServer;
}