'use strict';

var path = require('path');

module.exports = {
    mongo: {
        uri: (function() {
            var mongo_connection = 'mongodb://localhost/guia-gasto';
            if (process.env.MONGODB_SERVICE_HOST) {
                mongo_connection = 'mongodb://figueiredo:123456@' +
                    process.env.MONGODB_SERVICE_HOST + ':' +
                    process.env.MONGODB_SERVICE_PORT + '/' +
                    process.env.OPENSHIFT_BUILD_NAMESPACE;
            }
            return mongo_connection;
        })()
    },
    port: process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip: process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    root: path.normalize(__dirname + '/../..')
};