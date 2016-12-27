'use strict';

var path = require('path');

module.exports = {
    mongo: {
        uri: (function() {
            var mongo_connection = process.env.MONGOLAB_URI ||
                process.env.MONGOHQ_URL ||
                process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME ||
                'mongodb://localhost/guia-gasto';
            console.log(mongo_connection);
            return mongo_connection;
        })()
    },
    port: process.env.OPENSHIFT_NODEJS_PORT || 3000,
    ip: process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    root: path.normalize(__dirname + '/../..')
};