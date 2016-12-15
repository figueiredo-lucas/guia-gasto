'use strict'

function executeValidation(object, validator, validationName) {
    if (validator.hasOwnProperty(validationName)) {
        validator[validationName](object);
    }
}

function missingRequiredFields(object, validator) {
    if (validator.requiredFields) {
        for (var i = 0; i < validator.requiredFields.length; i++) {
            var required = validator.requiredFields[i];
            if (!object[required.field]) {
                return required.name;
            }
        }
    }
    return false;
};

function validateRequiredFields(object, validator) {
    var fieldName = false;
    if (fieldName = missingRequiredFields(object, validator)) {
        throw {
            htmlStatus: 400,
            err: 'Campo ' + fieldName + ' é obrigatório.'
        };
    }
}

function prePersist(object, validator, validationName) {
    if (validator) {
        validateRequiredFields(object, validator);
        executeValidation(object, validator, validationName);
    }
}

module.exports = function(validator) {
    return {
        preSave: function(object) {
            prePersist(object, validator, 'preSave');
        },
        preUpdate: function(object) {
            delete object._id;
            prePersist(object, validator, 'preUpdate');
        },
        mongoError: function(err) {
            if (err) {
                err.htmlStatus = 500;
                throw err;
            }
        },
        noData: function(object) {
            if (!object) {
                throw {
                    htmlStatus: 404,
                    err: 'ID não encontrado'
                };
            }
        },
        errors: function(err, object) {
            this.mongoError(err);
            this.noData(object);
        },
        handleError: function(res, err) {
            return res.status(err.htmlStatus).send(err);
        }
    }
};