'use strict';

var mongoose = require('mongoose'),
    encrypt = require('./../../components/encrypt'),
    Schema = mongoose.Schema;

var md5crypt

var Usuario = new Schema({
    login: String,
    senha: String
});

Usuario.pre('save', function(next) {
    this.senha = encrypt(this.senha);
    return next();
});

module.exports = mongoose.model('Usuario', Usuario);