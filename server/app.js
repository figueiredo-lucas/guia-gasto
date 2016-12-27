/**
 * Main application file
 */

'use strict';

// Set default node environment to development
// process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config');
var path = require('path');
var bodyParser = require('body-parser');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});
// Setup server
var app = express();
var server = require('http').createServer(app);
//require('./config/express')(app);



// console.log(path.join(config.root, 'bower_components'));
app.use('/', express.static(path.join(config.root, '/')));
app.use(favicon(path.join(config.root, 'static', 'favicon.ico')));
app.use(express.static(path.join(config.root, 'static')));
app.use(express.static(path.join(config.root, 'app')));
app.set('appPath', path.join(config.root, 'app'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// app.set('views', config.root + '/server/views');
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;