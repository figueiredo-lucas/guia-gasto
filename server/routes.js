/**
 * Main application routes
 */

'use strict';

// var errors = require('./components/errors');
var path = require('path');
var config = require('./config/route.config');

module.exports = function(app) {

    // Insert routes below
    console.log("Rotas criadas: ");
    for (var key in config) {
        if (config.hasOwnProperty(key)) {
            console.log(config[key].route);
            var rest = config[key].rest ? require(config[key].rest)(config[key]) : require('./rest')(config[key]);
            app.use(config[key].route, rest);
        }
    }

    // All undefined asset or api routes should return a 404
    // app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    // .get(errors[404]);

    // All other routes should redirect to the index.html
    app.route('/*')
        .get(function(req, res) {
            res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
        });
};