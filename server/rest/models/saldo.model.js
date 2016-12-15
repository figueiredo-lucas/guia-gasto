'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var Saldo = new Schema({
    saldo: Number,
    data: {
        type: Date,
        default: moment().startOf('day').toDate()
    }
});

Saldo.existeSaldoHoje = function() {
    Saldo.find({
        data: moment().startOf('day').toDate()
    }, function(err, saldo) {
        return !!saldo;
    });
}

Saldo.gerarSaldoHoje = function(movimentoDiario) {
    var saldoOntem = 0
    Saldo.find({
        data: moment().startOf('day').subtract(1, 'days').toDate()
    }, function(err, saldo) {
        if (saldo) {
            saldoOntem = saldo.saldo;
        }
    });
    var saldoHoje = {
        saldo: (saldoOntem + movimentoDiario)
    };

    Saldo.create(saldoHoje, function(err, object) {
        if (err) {
            throw err;
        }
    });
};

module.exports = mongoose.model('Saldo', Saldo);