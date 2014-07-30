var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Profile = new keystone.List('Profile');

Profile.add({
    user: { type: Types.Relationship, ref: 'User' },
	photo: { type: Types.CloudinaryImage, required: false, index: false },
	bio: { type: Types.Html, required: true, initial: true, index: false },
    skills: { type: Types.Relationship, ref: 'Skill', initial: true, required: false, many: true },
    twitter: { type: Types.Url, required: false, initial: true, index: false },
    linkedIn: { type: Types.Url, required: false, initial: true, index: false },
    facebook: { type: Types.Url, required: false, initial: true, index: false }
});

Profile.defaultColumns = 'user, photo, bio, skills, twitter, linkedIn, facebook';
Profile.register();