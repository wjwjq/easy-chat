const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const models = require('./models');
const mongo = require('../configs').mongo;
//const url = `mongodb://${mongo.username}:${mongo.password}@${mongo.host}:${mongo.port}/${mongo.database}`,{ useMongoClient: true };
const url = `mongodb://${mongo.host}:${mongo.port}/${mongo.database}`;
global.db = mongoose.connect(url,{ useMongoClient: true });
mongoose.connection.on('error', function () {
    console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

for ( let m in models) {
    mongoose.model(m, new Schema(models[m]));
}

const _getModel = (type) => {
    return mongoose.model(type);
};

module.exports = {
    getModel: (type) => {
        return _getModel(type);
    }
};
