var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Skill = new keystone.List('Skill');

Skill.add({
    name: { type: Types.Text, required: true, initial:true, index: false },
	website: { type: Types.Url, required: false, initial: true, index: false }
});

Skill.defaultColumns = 'name, website';
Skill.register();