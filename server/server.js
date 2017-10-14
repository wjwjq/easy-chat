const http = require('http');
const path = require('path');
const favicon = require('serve-favicon');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const vhost = require('vhost');
const credentials = require('./credentials');
const mongoose = require('mongoose');
const compression = require('compression');
//链接MongoDB
const mongo = require('./configs').mongo;
//const url = `mongodb://${mongo.username}:${mongo.password}@${mongo.host}:${mongo.port}/${mongo.database}`,{ useMongoClient: true };
const url = `mongodb://${mongo.host}:${mongo.port}/${mongo.database}`;
global.db = mongoose.connect(url,{ useMongoClient: true });
mongoose.connection.on('error', function () {
    console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

//引入前端路由
const easychatRoutes = require('./easychat/routes/');
//引入管理路由
const adminRoutes = require('./admin/routes/');

const app = express();
app.use(compression());

//设置服务器端口
app.set('port', process.env.PORT || 3000);

//设置模板引擎 ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//添加请求解析中间件bodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret
    // store: new MongoStore({
    //     url: credentials.mongo.development.connectionString
    // })
}));
//prevent CSRF
// app.use(require('csurf')());
// app.use(function (req, res, next) {
//     res.locals._csrfToken = req.csrfToken;
//     next();
// });
//解析favicon
app.use(favicon(__dirname + '/public/images/favicon.ico'));
//设置静态资源路径
app.use(express.static(path.join(__dirname, 'public')));

//配置子域 admin  
//访问 admin.host.com
var admin = express.Router();
app.use(vhost('admin.*', admin));
// create admin routes; these can be defined anywhere
//注入admin路由
adminRoutes(admin);

//配置子域 easychat 
//访问 easychat.host.com
var easychat = express.Router();
app.use(vhost('easychat.*', easychat));

//注入路由
easychatRoutes(easychat);
easychat.get('*', (req, res) => {
    console.info('loading from easychat domain');
    res.sendFile(path.resolve(__dirname) + '/public/easychat/index.html');
});

easychatRoutes(app);
app.get('/easychat/*', (req, res) => {
    res.sendFile(path.resolve(__dirname) + '/public/easychat/index.html');
});

//网站主页
app.get('/', (req, res) => {
    res.locals.title = "wjq\'s blog";
    res.locals.items = [{
        href: 'http://localhost:3000/easychat/',
        name: 'easychat'
    }];
    res.render('index');
});

var server = http.Server(app);

//注入server 到chat socket
require('./easychat/controllers/chat')(server);

// 404 Error Middleware
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 500 Error Middleware
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


function startServer() {
    server.listen(app.get('port'), function () {
        console.info(`Server started in ${ app.get('env') }, mode on http://localhost:${ app.get('port') }; press Ctrl-C to terminate.`);
    });
}


if (require.main === module) {
    startServer();
} else {
    //导出 方便使用 cluster
    module.exports = startServer;
}