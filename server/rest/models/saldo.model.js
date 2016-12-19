'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Saldo = new Schema({
    codigoFolha: Schema.Types.ObjectId,
    codigoMovimento: Schema.Types.ObjectId,
    saldo: Number,
    data: {
        type: Date,
        default: Date.now()
    }
});

var SaldoModel = mongoose.model('Saldo', Saldo);

module.exports = SaldoModel;