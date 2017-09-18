//MySql 暂未使用
const dbConfig = require('./configs.js').db;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.dbname, dbConfig.username, dbConfig.password, dbConfig.connect);

//用户表
const User = sequelize.define('user', {
    username: Sequelize.STRING,
    nickname: Sequelize.STRING,
    password: Sequelize.STRING,
    birthday: Sequelize.DATE,
    gender: Sequelize.BOOLEAN,
    avatar: Sequelize.STRING
});

//用户发布的文章表 Post
const Article = sequelize.define('article', {
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    image: Sequelize.STRING
});

//建立表关系
Article.belongsTo(User);


//创建评论表
const Comment = sequelize.define('comment', {
    content: Sequelize.STRING
});

Comment.belongsTo(User);
Comment.belongsTo(Article);

//点赞
const Star = sequelize.define('star', {
    content: Sequelize.STRING
});

Star.belongsTo(User);
Star.belongsTo(Article);

//评论回复
const Reply = sequelize.define('reply', {
    content: Sequelize.STRING
});

Reply.belongsTo(User);
Reply.belongsTo(Comment);

//用户关系表
const Friendship = sequelize.define('friendship', {

});

User.belongsToMany(User, {
    through: Friendship,
    as: 'friend'
});

sequelize.sync();

module.exports = {
    User,
    Article,
    Comment,
    Star,
    Reply,
    Friendship
};