var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Skill = new keystone.List('Skill');

Skill.add({
    name: { type: Types.Text, required: true, initial:true, index: true },
    description: { type: Types.Html, required: false, initial:true, index: false },
	website: { type: Types.Url, required: false, initial: true, index: false }
});

Skill.schema.virtual('baseName').get(function () {
    var parts = this.name.split(' - ');
    if(parts.length > 0){
        return parts[0];
    }
    return '';
});

Skill.schema.virtual('skillLevel').get(function () {
    var parts = this.name.split(' - L');
    if(parts.length > 1){
        return parts[1];
    }
    return '';
});

Skill.schema.virtual('skillLevelPct').get(function () {
    return this.skillLevel / 10.0;
});

Skill.defaultColumns = 'name, description, website';
Skill.register();