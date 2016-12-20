'use strict';

var Movimento = require('./models/movimento.model');

module.exports = function(config) {

    var router = require('./')(config);

    router.get('/folha/:id', function(req, res) {
        Movimento.find({ codigoFolha: req.params.id }, function(err, movimentos) {
            return res.status(200).json(movimentos);
        });
    });

    return router;

};