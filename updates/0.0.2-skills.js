/**
 * This script automatically creates skill entries from 1-10 for each type of skill
 * Example:
 * Java - L1
 * Java - L2
 * ...
 */

var skillBaseNames = [
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
];

var skills = [];

skillBaseNames.forEach(function(element, index, array){
    for(var i = 1; i <= 10; ++i){
        var name = element+' - L'+i;
        skills.push({
            'name': name,
            'baseName': element,
            'level': i,
            'description': '',
            'website': ''
        });
    }
});

exports.create = {
	Skill: skills
};

