/******************************************************************
 ***                                                          ***
 ***    Written by CJ.Hanson @ RhythmAgency.com               ***
 ***    Copyright 2014 (c) Rhythm Interactive                 ***
 ***                                                          ***
 *****************************************************************/

var conf = require('nconf');
var _ = require('underscore')._;

conf.argv().env().file({file: __dirname + '/config/config.json'});

process.env.PORT = conf.get("PORT");
process.env.NODE_ENV = conf.get("NODE_ENV");
process.env.DEBUG = conf.get("DEBUG");
process.env.HTTP_AUTH_ENABLED = conf.get("HTTP_AUTH_ENABLED");
process.env.HTTP_AUTH_USERNAME = conf.get("HTTP_AUTH_USERNAME");
process.env.HTTP_AUTH_PASSWORD = conf.get("HTTP_AUTH_PASSWORD");
process.env.NODE_DB_HOST = conf.get("NODE_DB_HOST");
process.env.NODE_DB_PORT = conf.get("NODE_DB_PORT");
process.env.NODE_DB_USERNAME = conf.get("NODE_DB_USERNAME");
process.env.NODE_DB_PASSWORD = conf.get("NODE_DB_PASSWORD");
process.env.NODE_DB_DATABASE = conf.get("NODE_DB_DATABASE");
process.env.NODE_DB_DEBUG = conf.get("NODE_DB_DEBUG");

var app = require('express')();
//var db = require('./config/database')(app);
//
//db.connect(function() {
//    require('./config/environment')(app);
//    require('./config/startup')(app);
//    require('./config/routes')(app);
//
//    /**
//     * Prepare Exit Callbacks
//     */
//
//        // gracefully close database on exit
//    process.stdin.resume();
//    process.on('SIGINT', function() {
//        app.get('db').close();
//        process.exit();
//    });

    /**
     * Ready, Set, Go!
     */

    app.get('/', function(req, res) {
      res.send('Hello World!');
    });

    app.listen(process.env.PORT, function() {
        console.log('Express server listening on port ' + process.env.PORT + ' in ' + process.env.NODE_ENV + ' mode');
    });
//});