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
    app.set('views', path.join(__dirname, 'templates'));
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

    app.get('/', function(req, res){
        res.render('default.desktop.normal.index.page.dust');
    });
    app.get('/login', function(req, res){
        res.render('default.desktop.normal.login.page.dust', {
            title: 'Sign in to WEBSITE',
            csrfToken: req.csrfToken()
        });
    });
    app.get('/registration', function(req, res){
        res.render('default.desktop.normal.createaccount.page.dust', {
            csrfToken: req.csrfToken()
        });
    });
    app.post('/registration', function(req, res){
        //validation
        res.render('default.desktop.normal.createaccount.page.dust', {
            csrfToken: req.csrfToken()
        });
    });

    app.get('/signin', function(req, res){
        res.render('default.desktop.normal.login.page.dust', {
            csrfToken: req.csrfToken()
        });
    });
    app.post('/signin', function(req, res){
        if (req.body && req.body.userid && req.body.passwd && req.body.userid === 'ysbsqa_gemini' && req.body.passwd === 'P1234567p') {
            res.redirect(301, 'http://fairrare.corp.ne1.yahoo.com/setcookie');
        } else {
            res.send("Sorry, you are not authorized");
        }
    });

    // app.get('/login', login.list);

    // error handling middleware should be loaded after the loading the routes
    if ('development' == app.get('env')) {
        app.use(errorHandler());
    }

    return app;
};
