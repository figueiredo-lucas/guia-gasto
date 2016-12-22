'use strict';

var mongoose = require('mongoose');
var Saldo = require('./saldo.model');
var _ = require('lodash');

var Schema = mongoose.Schema;

var Movimento = new Schema({
    codigoFolha: Schema.Types.ObjectId,
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
    var that = this;
    Saldo.findOne({ codigoFolha: this.codigoFolha }).sort({ data: -1 }).exec(function(err, doc) {
        var novoSaldo = {
            codigoFolha: that.codigoFolha,
            codigoMovimento: that._id,
            saldo: 0
        }
        if (doc) {
            novoSaldo.saldo = doc.saldo;
        }
        if (that.tipo === 'E') {
            novoSaldo.saldo += that.valor;
        } else {
            novoSaldo.saldo -= that.valor;
        }
        Saldo.create(novoSaldo, function(err) {
            if (err) {
                throw err;
            }
        });
    });
});

module.exports = mongoose.model('Movimento', Movimento);