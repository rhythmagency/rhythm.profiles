// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'Rhythm Profiles',
	'brand': 'Rhythm Profiles',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',
	
	
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': '%D?Sb*y3Uw~UJ5A(:A3=TNlq-m*bb0!f#NBWmg9bTW:%C?RaJ%tzh"ikVAhi-47&'

});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

// Configure the navigation bar in Keystone's Admin UI

var fs = require('fs');
var path = require('path');
var modelFiles = fs.readdirSync('models');
var navObj = {};
modelFiles.forEach(function(element, index, array){
    var name = path.basename(element, path.extname(element)).toLowerCase()+'s';
    navObj[name] = name;
});

keystone.set('nav', navObj);

// Start Keystone to connect to your database and initialise the web server

keystone.start();
