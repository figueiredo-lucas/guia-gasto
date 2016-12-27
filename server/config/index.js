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
    port: process.env.GGWP_SERVICE_PORT || 3000,
    ip: process.env.GGWP_SERVICE_HOST || '0.0.0.0',
    root: path.normalize(__dirname + '/../..')
};
