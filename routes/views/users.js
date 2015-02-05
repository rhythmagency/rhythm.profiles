var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'users';

    var usersQ = keystone.list('User').model.find().sort('name.last').populate({path: 'skills', options: { sort: {'level':'desc'} }});

    view.query('users', usersQ);

	// Render the view
	view.render('users');
};
