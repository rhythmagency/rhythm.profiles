var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'users';

    var usersQ = keystone.list('User').model.find().sort('name.last').populate({path: 'skills', options: { sort: {'level':'desc'} }});

    view.query('users', usersQ);

    //Cleanup user accounts related to duplicate skills
    keystone.list('Skill').model.find().exec(function(err, allSkills){
        if(err){
            console.log(err);
        }else{
            var allSkillsIndexedByID = {};
            var skillsSet = {};
            var skillIDsToDelete = [];
            allSkills.forEach(function(el, idx, arr){
                var key = el.baseName+el.level;
                if(!(key in skillsSet)){
                    skillsSet[key] = [];
                }

                skillsSet[key].push(el.id);

                if(skillsSet[key].length > 1){
                    skillIDsToDelete.push(el.id);
                }

                allSkillsIndexedByID[el.id] = el;
            });

            console.log(skillsSet);
            console.log(skillIDsToDelete);
            console.log('');

            keystone.list('User').model.find().exec(function(err, users){
                if(err){
                    console.log(err);
                }else{
                    users.forEach(function(el, idx, arr){
                        var userSkills = {};
                        el.skills.forEach(function(el2, idx2, arr2){
                            var aSkill = allSkillsIndexedByID[el2];
                            //take the first skill of this type/level
                            aSkill = allSkillsIndexedByID[skillsSet[aSkill.baseName+aSkill.level][0]];
                            var key = aSkill.baseName;
                            if(!(key in userSkills)){
                                userSkills[key] = aSkill;
                            }else{
                                if(userSkills[key].level < aSkill.level)
                                    userSkills[key] = aSkill;
                            }
                        });

                        console.log('User skills:');
                        console.log(userSkills);

                        el.skills = [];
                        for(var idx2 in userSkills){
                            el.skills.push(userSkills[idx2].id);
                        }

                        console.log('Skills to save:');
                        console.log(el.skills);

                        console.log(el);

                        el.save(function(err){
                            if(err){
                                console.log(err);
                            }else{
                                console.log('Saved user ', el);
                            }
                        });

                        console.log('');
                    });

                    //delete duplicate skills
                    skillIDsToDelete.forEach(function(el, idx, arr){
                        keystone.list('Skill').model.findById(el).remove(function(err){
                            if(err){
                                console.log(err);
                            }else{
                                console.log('Removed skill ', el);
                            }
                        });
                    });
                }
            });
        }
    });

	// Render the view
	view.render('users');
};
