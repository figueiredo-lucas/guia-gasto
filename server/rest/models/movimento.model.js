'use strict';

var mongoose = require('mongoose');
var Saldo = require('./saldo.model');
var moment = require('moment');
var _ = require('lodash');

var Schema = mongoose.Schema;

var Movimento = new Schema({
    codigoUsuario: Schema.Types.ObjectId,
    valor: Number,
    tipo: String,
    descricao: String,
    data: {
        type: Date,
        default: Date.now
    }
});

Movimento.pre('save', function(next) {
    if (!this.tipo || (this.tipo !== 'E' && this.tipo !== 'S')) {
        var err = new Error('Tipo inválido. Possíveis: E (entrada), S (saída).');
        return next(err);
    }
    return next();
});

Movimento.post('save', function() {
    if (!Saldo.existeSaldoHoje()) {
        Saldo.gerarSaldoHoje(obterMovimentoDiario());
    }
});

var obterMovimentoDiario = function() {
    var inicioOntem = moment().startOf('day').subtract(1, 'days').toDate();
    var fimOntem = moment().endOf('day').subtract(1, 'days').toDate();
    var totalMovimento = 0;
    Movimento.find({
        data: {
            $gte: inicioOntem
        }
    }, {
        data: {
            $lte: fimOntem
        }
    }, function(movimentos) {
        _.each(movimentos, function(movimento) {
            if (movimento.tipo === 'E') {
                totalMovimento += movimento.valor;
            } else {
                totalMovimento -= movimento.valor;
            }
        });
    });
    return totalMovimento;
}

module.exports = mongoose.model('Movimento', Movimento);