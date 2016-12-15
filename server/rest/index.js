'use strict';

var express = require('express');

module.exports = function(config) {

    var controller = require('./AbstractRest')(config);

    var router = express.Router();

    router.get('/', controller.index);
    router.get('/:id', controller.show);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.patch('/:id', controller.update);
    router.delete('/:id', controller.destroy);

    return router;

};