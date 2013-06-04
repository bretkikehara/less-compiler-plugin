var vows = require('vows'),
	fs = require('fs'),
	path = require('path'),
    assert = require('assert'),
	compiler = require('../lib/index.js'),
	encoding = {encoding: 'utf-8'};

var tests = {
	'find all the assets': {
		topic : function() {
			var baseDir = './tests/assets/';
			return compiler.findLessFiles(baseDir);
		},
		'find all the assets': function(arr) {
			var expected = {
				'./tests/assets/file1.less': true,
				'./tests/assets/skin/sam/file2.less': true,
				'./tests/assets/skin/sam/file3.less': true
			};

			for (var index in expected) {
				expected[path.normalize(index)] = true;
			}

			assert.isTrue(arr.length === 3);
			for (var index in arr) {
				assert.isTrue(expected[arr[index]]);
			}
		}
	},
	'no less files exists': {
		topic : function() {
			return compiler.findLessFiles('./lib/');
		},
		'no less files exists': function(arr) {
			assert.isTrue(arr.length === 0);
		}
	},
	'Write file' : {
		topic : function() {
			var error = null,
			compiledCSS = '.foo{color:red;}',
			obj = {
				"filePath": path.normalize("./tests/writeTest.less"),
				"handler": compiler.writeCompiledCSSToDisk
			};
			try {
				obj.handler(error, compiledCSS);
			}
			catch(error) {
				console.log(error);
				return null;
			}

			// return dummy value.
			return obj.filePath;
		},
		'Write file' : function(compiledFile) {
			var error, compiledData;
			assert.isNotNull(compiledFile);

			compiledFile = compiledFile.replace('.less', '.css');
			assert.isTrue(fs.existsSync(compiledFile));

			compiledData = fs.readFileSync(compiledFile, encoding);
			assert.isTrue(compiledData.length > 0);
			assert.isFalse(compiledData === 'undefined');
		}
	},
	'Cannot compile null directory': {
		topic: function() {
			return compiler.run(null);
		},
		'Cannot compile null directory': function(isCompiled) {
			assert.isFalse(isCompiled);
		}
	},
	'No directory passed as a parameter': {
		topic: function() {
			return compiler.run();
		},
		'No directory passed as a parameter': function(isCompiled) {
			assert.isFalse(isCompiled);
		}
	},
	'No LESS files found': {
		topic: function() {
			return compiler.run('./lib/');
		},
		'No LESS files found': function(isCompiled) {
			assert.isFalse(isCompiled);
		}
	},
	'Compile the less files': {
		topic: function() {
			return compiler.run('./tests/assets/');
		},
		'Compile the less files': function(isCompiled) {
			assert.isTrue(isCompiled);
		}
	}
};

vows.describe('general').addBatch(tests).export(module);