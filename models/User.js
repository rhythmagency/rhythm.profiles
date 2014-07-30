var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */

var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true },

    photo: { type: Types.CloudinaryImage, required: false, index: false },
	bio: { type: Types.Html, required: false, initial: true, index: false },
    skills: { type: Types.Relationship, ref: 'Skill', initial: true, required: false, many: true },
    twitter: { type: Types.Url, required: false, initial: true, index: false },
    linkedIn: { type: Types.Url, required: false, initial: true, index: false },
    facebook: { type: Types.Url, required: false, initial: true, index: false }
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});


/**
 * Registration
 */

User.defaultColumns = 'name, email, skills, isAdmin';
User.register();
