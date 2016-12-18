'use strict';

var mongoose = require('mongoose'),
    _ = require("lodash"),
    Schema = mongoose.Schema;

var Folha = new Schema({
    nomeFolha: String,
    codigoUsuario: Schema.Types.ObjectId,
    folhaPadrao: {
        type: Boolean,
        default: false
    }
});

Folha.post('save', function() {
    if (this.folhaPadrao) {
        var that = this;
        FolhaModel.find({ codigoUsuario: this.codigoUsuario }, function(err, folhas) {
            if (folhas) {
                _.each(folhas, function(folha) {
                    if (folha._id.toString() !== that._id.toString()) {
                        folha.folhaPadrao = false;
                        folha.save();
                    }
                });
            }
        });
    }
});

var FolhaModel = mongoose.model('Folha', Folha);

// Folha.pre('update', preFunction);

module.exports = FolhaModel;