module.exports = {
    mysql: {
        database: 'easychat',
        username: 'root',
        password: 'wjq123',
        connect: {
            host: '127.0.0.1',
            port: '27017',
            dialect: 'mysql',
            options: {
                pool: {
                    max: 5,
                    min: 0,
                    idle: 10000
                }
            }
        }
    },
    mongo: {
        database: 'easychat',
        username: 'root',
        password: 'wjq123',
        host: '127.0.0.1',
        port: '27017'
    }
};