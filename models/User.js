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
    title: { type: Types.Text, required: false, initial: true, index: false },
	bio: { type: Types.Html, required: false, initial: true, index: false },
    skills: { type: Types.Relationship, ref: 'Skill', initial: true, required: false, many: true },
    stackoverflow: { type: Types.Url, required: false, initial: true, index: false },
    bitbucket: { type: Types.Url, required: false, initial: true, index: false },
    github: { type: Types.Url, required: false, initial: true, index: false },
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

User.schema.virtual('emailHash').get(function () {
    var MD5 = require('MD5');
    return MD5(this.email.trim().toLowerCase());
});

User.schema.virtual('experience').get(function(){
    var points = 0;
    var exp = 3;
    if(this.skills.length){
        this.skills.forEach(function(element, i, array){
            if(typeof(element) === 'object') {
                var levelI = parseInt(element.level);
                points += Math.pow(levelI, exp);
            }
        });
    }

    if(points)
        points = Math.round(Math.pow(points, 1.0/(exp-1)));

    return points;
});

User.schema.virtual('points').get(function(){
    var points = 0;
    if(this.skills.length){
        this.skills.forEach(function(element, i, array){
            if(typeof(element) === 'object') {
                var levelI = parseInt(element.level);
                points += levelI;
            }
        });
    }

    return points;
});

User.schema.virtual('averageSkillLevel').get(function(){
    var points = this.points;

    if(points > 0 && this.skills.length){
        var average = Math.round(parseFloat(points) / parseFloat(this.skills.length));
        return Math.ceil(average);
    }

    return 1;
});

User.schema.virtual('skillsByBaseName').get(function(){
    var skillsByBaseName = {};
    this.skills.forEach(function(skill, idx, arr){
        skillsByBaseName[skill.baseName] = skill;
    });
    return skillsByBaseName;
});

/**
 * Validation
 */

User.schema.pre('save', function (next) {
	var self = this;

    //don't allow duplicate skills based on the baseName
    if(self.skills.length){
        keystone.list('Skill').model.find().exec(function(err, allSkills){
            if(err){
                next(err);
            }else {
                var allSkillsIndexedByID = {};
                allSkills.forEach(function(el, idx, arr) {
                    allSkillsIndexedByID[el.id] = el;
                });

                var isOK = true;
                var duplicateSkillBaseName = '';
                var skillsIndexedByBaseName = {};
                self.skills.forEach(function(el, idx, arr){
                    var aSkill = allSkillsIndexedByID[el];
                    if(!(aSkill.baseName in skillsIndexedByBaseName)){
                        skillsIndexedByBaseName[aSkill.baseName] = 1;
                    }else{
                        isOK = false;
                        duplicateSkillBaseName = aSkill.baseName;
                    }
                });

                if(!isOK){
                    next(new Error('You cannot have more than one skill level for the same skill. "'+duplicateSkillBaseName+'"'));
                }else{
                    next();
                }
            }
        });
    }else{
        next();
    }
});

/**
 * Registration
 */

User.defaultColumns = 'name, title, email, skills, isAdmin';
User.register();
