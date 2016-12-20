'use strict';

var express = require('express');
var Saldo = require('./models/saldo.model');

module.exports = function() {

    var router = express.Router();

    router.get('/folha/:id', function(req, res) {
        Saldo.find({ codigoFolha: req.params.id }, function(err, saldos) {
            return res.status(200).json(saldos);
        });
    });

    router.get('/atual/:id', function(req, res) {
        Saldo.findOne({ codigoFolha: req.params.id }).sort({ data: -1 }).exec(function(err, saldo) {
            if (saldo) {
                return res.status(200).json(saldo);
            } else {
                return res.status(200).json({ saldo: 0 });
            }
        });
    });

    return router;

};