'use strict';

var express = require('express');
var Folha = require('./models/folha.model');

module.exports = function(config) {

    var router = require('./')(config);

    router.get('/usr/:id', function(req, res) {
        Folha.find({ codigoUsuario: req.params.id }, function(err, folhas) {
            return res.status(200).json(folhas);
        });
    });

    return router;

};