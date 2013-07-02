#!/usr/bin/env node

var compiler = require('../lib/index.js'),
folders = process.argv.slice(2);

if (folders.length === 0) {
	folders.push('assets');
	folders.push('css');
}

console.log("Searching in: " + folders.join(', '));
folders.forEach(function(folder) {
	compiler.run(folder);
});