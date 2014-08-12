var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'user';

    view.query('users', keystone.list('User').model.find({_id:req.params.id}).sort('name.last').populate({path: 'skills', options: { sort: {'level':'desc'} }}));

	// Render the view
	view.render('user');
};
