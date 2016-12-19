'use strict';

var mongoose = require('mongoose');
var Saldo = require('./saldo.model');
var moment = require('moment');
var _ = require('lodash');

var Schema = mongoose.Schema;

var Movimento = new Schema({
    codigoFolha: Schema.Types.ObjectId,
    valor: Number,
    tipo: String,
    descricao: String,
    data: {
        type: Date,
        default: Date.now()
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
    Saldo.findOne({codigoFolha: this.codigoFolha}).sort({data: -1}).exec(function(err, doc) {
        var novoSaldo = {
            codigoFolha: that.codigoFolha,
            codigoMovimento: that._id,
            saldo: 0
        }
        if(doc) {
            novoSaldo.saldo = doc.saldo;
        }
        if(that.tipo === 'E') {
            novoSaldo.saldo += that.valor;
        } else {
            novoSaldo.saldo -= that.valor;
        }
        Saldo.create(novoSaldo, function(err) {
            if(err) {
                throw err;
            }
        });
    });
});

var MovimentoModel = mongoose.model('Movimento', Movimento);

// var obterMovimentoDiario = function() {
//     var inicioOntem = moment().startOf('day').subtract(1, 'days').toDate();
//     var fimOntem = moment().endOf('day').subtract(1, 'days').toDate();
//     var totalMovimento = 0;
//     MovimentoModel.find({
//         data: {
//             $gte: inicioOntem
//         }
//     }, {
//         data: {
//             $lte: fimOntem
//         }
//     }, function(movimentos) {
//         _.each(movimentos, function(movimento) {
//             if (movimento.tipo === 'E') {
//                 totalMovimento += movimento.valor;
//             } else {
//                 totalMovimento -= movimento.valor;
//             }
//         });
//     });
//     return totalMovimento;
// }

// var existeSaldoHoje = function() {
//     Saldo.find({
//         data: moment().startOf('day').toDate()
//     }, function(err, saldo) {
//         return !!saldo;
//     });
// }

// var gerarSaldoHoje = function(movimentoDiario) {
//     var saldoOntem = 0
//     Saldo.find({
//         data: moment().startOf('day').subtract(1, 'days').toDate()
//     }, function(err, saldo) {
//         if (saldo) {
//             saldoOntem = saldo.saldo;
//         }
//     });
//     var saldoHoje = {
//         saldo: (saldoOntem + movimentoDiario)
//     };

//     Saldo.create(saldoHoje, function(err, object) {
//         if (err) {
//             throw err;
//         }
//     });
// };


module.exports = MovimentoModel;