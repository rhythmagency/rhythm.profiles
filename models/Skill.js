var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Skill = new keystone.List('Skill');

Skill.add({
    name: { type: Types.Text, required: true, initial:true, index: true },
    baseName: { type: Types.Text, required: true, initial:true, index: true },
    level: { type: Types.Number, required: true, initial:true, index: true }
});

Skill.schema.pre('save', function (next) {
	var self = this;

    if(self.level == 0 && self.name == self.baseName){
        //Automatically generate 10 levels based on this name

        //check if skill already exists
        Skill.model.find({'baseName':{$regex: new RegExp('^'+self.baseName+'$', 'i')}}, function(err, docs){
            if(err){
                next(err);
            }else if(docs.length) {
                next(new Error('A skill with that base name already exists.'));
            }else{
                var skills = [];

                for(var i = 1; i <= 10; ++i){
                    var name = self.baseName+' - L'+i;
                    skills.push({
                        'name': name,
                        'baseName': self.baseName,
                        'level': i
                    });
                }

                Skill.model.collection.insert(skills, function(err, docs){
                    if(err){
                        next(err);
                    }else{
                        if(docs.length == 10)
                            next();
                        else
                            next(new Error('Failed to automatically create levels for this skill. ('+docs.length+'/10)'));
                    }
                });
            }
        });
    }else{
        //check if skill already exists
        Skill.model.find({'level': self.level, 'baseName':{$regex: new RegExp('^'+self.baseName+'$', 'i')}}, function(err, docs) {
            if (err) {
                next(err);
            } else if (docs.length) {
                next(new Error('That skill/level already exists.'));
            } else {
                //Just insert this record now
                next();
            }
        });
    }
});

Skill.schema.post('save', function(doc){
    if(doc.level == 0 && doc.name == doc.baseName){
        //delete dummy entry that was used to automatically generate 10 levels in the pre save
        Skill.model.remove(doc, function(err){
            //console.log('Removed temp skill. Err:', err);
        });
    }
});

Skill.defaultColumns = 'name, baseName, level';
Skill.register();