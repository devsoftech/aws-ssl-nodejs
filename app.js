'use strict';
module.exports.create = function (server, host, port, publicDir) {
    var express = require('express');
var routes = require('./routes');
var login = require('./routes/login');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var csurf = require('csurf');
var multer = require('multer');
var errorHandler = require('errorhandler');

var app = express();
var cons = require('consolidate');
app.engine('dust', cons.dust);

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'dust');
app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true, saveUninitialized: true, secret: 'uwotm8' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(csurf());
app.use(express.static(path.join(__dirname, 'public')));

    app.get('/test', function(req, res){
        res.render('index', {
            title: 'Testing out dust.js server-side rendering'
        });
    });

    // app.get('/login', login.list);

    // error handling middleware should be loaded after the loading the routes
    if ('development' == app.get('env')) {
        app.use(errorHandler());
    }

    return app;
};
