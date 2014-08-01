var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

    locals.skillBaseNames = [];

    view.on('init', function(next) {
        keystone.list('Skill').model.find().distinct('baseName').exec(function(err, results){
            if (err || !results.length) {
                return next(err);
            }

            results.sort(function (a, b) {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            });
            locals.skillBaseNames = results;

            next();
        });
    });
	
	// Render the view
	view.render('index');
	
};
