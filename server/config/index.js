'use strict';

var path = require('path');

module.exports = {
    mongo: {
        uri: 'mongodb://localhost/guia-gasto'
    },
    port: 3000,
    ip: '0.0.0.0',
    root: path.normalize(__dirname + '/../..')
};