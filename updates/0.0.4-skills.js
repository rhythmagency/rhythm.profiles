/**
 * This script automatically creates skill entries from 1-10 for each type of skill
 * Example:
 * Java - L1
 * Java - L2
 * ...
 */

var skillBaseNames = [
//    //Added in 0.0.2
//    'C',
//    'C++',
//    'Obj-C',
//    '.NET C#',
//    'Java',
//    'iOS',
//    'Android',
//    'PHP',
//    'HTML',
//    'JS',
//    'Node.js',
//    'CSS',
//    'Linux Server',
//    'Windows Server',
//    'SQL'

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
    'Communication',

    //Added in 0.0.4
    'CakePHP'
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

