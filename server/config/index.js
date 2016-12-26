'use strict';

var path = require('path');

module.exports = {
    mongo: {
        uri: (function() {
            var db_name = 'guia-gasto';
            var mongo_connection = 'mongodb://localhost/';
            if (process.env.OPENSHIFT_MONGODB_DB_URL) {
                mongo_connection = process.env.OPENSHIFT_MONGODB_DB_URL;
            }
            return mongo_connection + db_name;
        })()
    },
    port: process.env.OPENSHIFT_NODEJS_PORT || 3000,
    ip: process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    root: path.normalize(__dirname + '/../..')
};