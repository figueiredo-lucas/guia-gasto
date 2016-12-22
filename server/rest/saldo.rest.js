'use strict';

var express = require('express');
var Saldo = require('./models/saldo.model');
var moment = require('moment');

module.exports = function() {

    var router = express.Router();

    router.get('/folha/:id', function(req, res) {
        var dataInicial = req.query.dataInicial ? moment(Number(req.query.dataInicial)) : undefined;
        var dataFinal = req.query.dataFinal ? moment(Number(req.query.dataFinal)) : undefined;
        var query = { codigoFolha: req.params.id };
        if (dataInicial && dataFinal) {
            query.data = {
                $gte: dataInicial,
                $lte: dataFinal
            };
        }

        Saldo.find(query, function(err, saldos) {
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