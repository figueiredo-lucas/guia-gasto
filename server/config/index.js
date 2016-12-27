'use strict';

var path = require('path');

module.exports = {
    mongo: {
        uri: (function() {
            var mongo_connection = 'mongodb://localhost/guia-gasto';
            console.log(process.env);
            if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
                mongo_connection = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
                    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
                    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
                    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
                    process.env.OPENSHIFT_APP_NAME;
            }
            console.log(mongo_connection)
            return mongo_connection;
        })()
    },
    port: process.env.OPENSHIFT_NODEJS_PORT || 3000,
    ip: process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    root: path.normalize(__dirname + '/../..')
};