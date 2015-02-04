var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

    locals.users = [];
    locals.skillBaseNames = [];

    view.on('init', function(next) {
        keystone.list('User').model.find().sort('name.last').populate({path: 'skills', options: { sort: {'level':'desc'} }}).exec(function(err, users){
            if(err || !users.length){
                return next(err);
            }

            locals.users = users;
        }).then(function(){
            //Limit homepage list of skills to those relevant to a Project Manager looking to match a developer with a type of project at Rhythm
            var visibleSkills = [];
            /*
                //Added in 0.0.2
                'C',
                'C++',
                'Obj-C',
                '.NET C#',
                'Java',
                'iOS',
                'Android',
                'PHP',
                'HTML',
                'JS',
                'Node.js',
                'CSS',
                'Linux Server',
                'Windows Server',
                'SQL'

                //Added in 0.0.3
                'RegEx',
                'Nginx',
                'Apache',
                'AWS',
                'VB.NET',
                'Angular.js',
                'jQuery',
                'Docker',
                'SASS',
                'LESS',
                'Ruby',
                'Python',
                'Go',
                'Umbraco',
                'Keystone.js',
                'Elasticsearch',
                'WordPress',
                'Drupal',
                'Documentation',
                'Communication'

                //Added in 0.0.4
                'CakePHP'
             */
            visibleSkills.push({'baseName':'C'});
            visibleSkills.push({'baseName':'C++'});
            visibleSkills.push({'baseName':'Obj-C'});
            visibleSkills.push({'baseName':'.NET C#'});
            visibleSkills.push({'baseName':'Java'});
            visibleSkills.push({'baseName':'iOS'});
            visibleSkills.push({'baseName':'Android'});
            visibleSkills.push({'baseName':'PHP'});
            visibleSkills.push({'baseName':'HTML'});
            visibleSkills.push({'baseName':'CSS'});
            visibleSkills.push({'baseName':'Windows Server'});
            visibleSkills.push({'baseName':'Linux Server'});
            visibleSkills.push({'baseName':'Umbraco'});
            visibleSkills.push({'baseName':'AWS'});
            visibleSkills.push({'baseName':'WordPress'});
            visibleSkills.push({'baseName':'Elasticsearch'});
            visibleSkills.push({'baseName':'CakePHP'});

            keystone.list('Skill').model.find({$or:visibleSkills}).distinct('baseName').exec(function(err, results){
                if (err || !results || !results.length) {
                    return next(err);
                }

                results.sort(function (a, b) {
                    return a.toLowerCase().localeCompare(b.toLowerCase());
                });

                locals.skillsWithUsers = {};

                results.forEach(function(skillBaseName, idx, arr){
                    locals.skillsWithUsers[skillBaseName] = [];

                    locals.users.forEach(function(user, idx2, arr2){
                        user.skills.forEach(function(skill, idx3, arr3){
                            if(skill.baseName == skillBaseName){
                                locals.skillsWithUsers[skillBaseName].push(user);
                            }
                        });
                    });

                    locals.skillsWithUsers[skillBaseName].sort(function (a, b) {
                        var comp = 1;

                        var matched = false;
                        a.skills.forEach(function(skillA, idxA, arrA){
                            if(matched)
                                return;
                            b.skills.forEach(function(skillB, idxB, arrB){
                                if(skillBaseName == skillA.baseName && skillBaseName == skillB.baseName){
                                    if(skillA.level == skillB.level){
                                        comp = 0;
                                    }else if(skillA.level > skillB.level){
                                        comp = -1;
                                    }
                                    matched = true;
                                    return;
                                }
                            });
                        });

                        return comp;
                    });
                });

                locals.skillBaseNames = results;

                next();
            });
        });
    });
	
	// Render the view
	view.render('index');
	
};
