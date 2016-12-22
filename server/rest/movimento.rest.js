'use strict';

var Movimento = require('./models/movimento.model');
var moment = require('moment');

module.exports = function(config) {

    var router = require('./')(config);

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

        Movimento.find(query, function(err, movimentos) {
            return res.status(200).json(movimentos);
        });
    });

    return router;

};