'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Usuario = new Schema({
    login: String,
    senha: String
});

module.exports = mongoose.model('Usuario', Usuario);