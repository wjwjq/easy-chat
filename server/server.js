const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const vhost = require('vhost');

const app = express();

app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


var admin = express.Router();
app.use(vhost('admin.*', admin));

// create admin routes; these can be defined anywhere
admin.get('/', (req, res) => {
    res.send('hello admin');
});

app.get('/api/messages', (req, res) => {
    const data = [{
        'userId': '1',
        'msgs': [{
            'from': 1, 
            'content': '哈哈哈，这是第一条内容,哈哈哈，这是第一条内容,哈哈哈，这是第一条内容,哈哈哈，这是第一条内容!',
            'publishTime': '2017-09-11 18:27:30'
        },{
            'from': 0,
            'content': '哈哈哈，这是第二条内容',
            'publishTime': '2017-09-11 18:27:32'
        }]
    },
    {
        'userId': '2',
        'msgs': [{
            'from': 1, 
            'content': '哈哈哈，这是第二条内容',
            'publishTime': '2017-09-11 18:21:30'
        }]
    },
    {
        'userId': '3',
        'msgs': [{
            'from': 1, 
            'content': '哈哈哈，这是第三条内容',
            'publishTime': '2017-09-10 18:27:30'
        }]
    },
    {
        'userId': '4',
        'msgs': [{
            'from': 1, 
            'content': '哈哈哈，这是第4条内容',
            'publishTime': '2017-09-1 18:27:30'
        }]
    }
    ];
    res.json(data);   
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
        'gender': 0,
        'nickname': 'test A-2',
        'order': 'B',
        'remark': '',
        'telephone': '',
        'userId': '2',
        'username': 'wjwjq456@qq.com'
    },{
        'address': '',
        'avatarUrl': '',
        'gender': 0,
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
    }
    ];
    res.json(data);   
});

app.post('/api/auth', (req, res) => {
    const data = {   
        'status': 'ok',
        'token': '123456aavss',
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
    res.send(data);   
});

//出现无限死循环 应改为前端渲染
app.get('/upgrade_your_browser', (req, res) => {
    res.render('upgrade_your_browser_min');
});



app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname) + '/public/index.html');
});

// app.get('/', (req, res) => {
//     res.locals.title = 'index';
//     res.render('index');
// });

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
  

app.use(function (err, req, res, next) {
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