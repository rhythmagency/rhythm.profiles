var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'users';

    view.query('users', keystone.list('User').model.find().sort('name').populate('skills'));

	// Render the view
	view.render('users');

};
