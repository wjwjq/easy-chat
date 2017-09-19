const main = require('../handlers/main');

module.exports = function (admin) {
    admin.get('/', main);
};