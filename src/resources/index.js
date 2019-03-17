const d = require.context('@/resources', true, /^\.\/[a-zA-Z0-9\_\/]+\.js$/);

let resources = {}

d.keys().forEach(key => {
	let filename = key
	key = /[\w\d_]+.js/.exec(key)[0]
	key = key.split('.')[0]
   	resources[key] =  require('@/resources/'+filename.replace(/^.\/{1}/, '')).default
});

module.exports.default = resources
module.exports = resources