var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Skill = new keystone.List('Skill');

Skill.add({
    name: { type: Types.Text, required: true, initial:true, index: true },
    baseName: { type: Types.Text, required: true, initial:true, index: true },
    level: { type: Types.Number, required: true, initial:true, index: true },
    description: { type: Types.Html, required: false, initial:true, index: false },
	website: { type: Types.Url, required: false, initial: true, index: false }
});

Skill.defaultColumns = 'name, baseName, level';
Skill.register();