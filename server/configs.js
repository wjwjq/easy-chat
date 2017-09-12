module.exports = {
    db: {
        dbname: 'easytalk',
        username: 'root',
        password: 'wjq123',
        connect: {
            host: '127.0.0.1',
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        }
    }
};