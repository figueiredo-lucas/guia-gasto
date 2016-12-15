'use strict';

var _ = require('lodash');

function createModelName(model) {
    return './models/' + model + '.model';
}

module.exports = exports = function(config) {

    var validator = require('./AbstractValidator')(config.validator);
    var Model = require(createModelName(config.model));
    var methods = {};

    // Get list of Objects
    methods.index = function(req, res) {
        try {
            Model.find(function(err, object) {
                validator.mongoError(err);
                return res.status(200).json(object);
            });
        } catch (err) {
            return validator.handleError(res, err);
        }
    };

    // Get a single Object
    methods.show = function(req, res) {
        try {
            Model.findById(req.params.id, function(err, object) {
                validator.errors(err, object);
                return res.json(object);
            });
        } catch (err) {
            return validator.handleError(res, err);
        }
    };

    // Creates a new Object in the DB.
    methods.create = function(req, res) {
        try {
            console.log(req.body);
            validator.preSave(req.body);
            Model.create(req.body, function(err, object) {
                validator.mongoError(err);
                return res.status(201).json(object);
            });
        } catch (err) {
            return validator.handleError(res, err);
        }
    };

    // Updates an existing Object in the DB.
    methods.update = function(req, res) {
        validator.preUpdate(req.body);
        Model.findById(req.params.id, function(err, object) {
            validator.errors(err, object);
            var updated = _.merge(object, req.body);
            updated.save(function(err) {
                validator.mongoError(err);
                return res.status(200).json(object);
            });
        });
    };

    // Deletes an Object from the DB.
    methods.destroy = function(req, res) {
        try {
            Model.findById(req.params.id, function(err, object) {
                validator.errors(err, object);
                object.remove(function(err) {
                    validator.mongoError(err);
                    return res.status(204).send('No Content');
                });
            });
        } catch (err) {
            return validator.handleError(res, err);
        }
    };

    return methods;
};