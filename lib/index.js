/*jshint forin: false */
var fs = require('fs'),
    path = require('path'),
    less = require('less'),
	fileExtention = '.less',
	encoding = {encoding: 'utf-8'};

/**
* Finds all the LESS files.
*
* @param baseDir String path to search.
* @protected
*/
var findLessFiles = function(baseDir) {
	var files = fs.readdirSync(baseDir),
	foundFiles,
	lessFiles = [];

	// find all less files.
	files.forEach(function(file) {
		var filePath = path.normalize(path.join(baseDir, file)),
		stat;
		if (path.extname(file) === fileExtention) {
			lessFiles.push(filePath);
		}
		else {
			stat = fs.statSync(filePath);
			if (stat && stat.isDirectory()) {
				foundFiles = findLessFiles(filePath);
				foundFiles.forEach(function(foundFile) {
					lessFiles.push(foundFile);
				});
			}
		}
	});
	return lessFiles;
};

/**
* Write the compiled CSS to disk. 
*
* @param compileError Any error when compiling.
* @param css Compiled CSS String.
* @protected
*/
var writeCompiledCSSToDisk = function(compileError, css) {
	var cssFile = this.filePath.replace('.less', '.css'),
	diskError;
	if (compileError) {
		console.log('[err] Failed to compile: ' + this.filePath);
		console.log('[stack] ' + compileError.message);
		console.log('[stack] ' + compileError.stack);
	}
	else {
		diskError = fs.writeFileSync(cssFile, css, encoding);
		if (diskError) {
			console.log('[err] Failed to write compiled CSS to ' + this.filePath);
			console.log(diskError);
		}
	}
};

/**
* Recursively compiles all less files.
*
* @param baseDir File path as a String.
* @protected
*/
var run = function(baseDir) {

	console.log('[info] Compiling less files in: ' + baseDir);

	if (!baseDir || !fs.existsSync(baseDir)) {
		console.log("[warn] Base directory was invalid: " + baseDir);
		return false;
	}

	// find all less files
	var lessFiles = findLessFiles(baseDir);
	if (lessFiles.length === 0) {
		console.log("[warn] No LESS files were found");
		return false;
	}

	// compile the file.
	lessFiles.forEach(function(filePath) {
		console.log('[info] Compiling file: ' + filePath);
		var data = fs.readFileSync(filePath, encoding),
		obj = {
			"filePath": filePath,
			"handler": writeCompiledCSSToDisk
		};
		less.render(data, function(error, css) {
			obj.handler(error, css);
		});
	});

	return true;
};

// used for testing.
exports.findLessFiles = findLessFiles;
exports.writeCompiledCSSToDisk = writeCompiledCSSToDisk;

// public function.
exports.run = run;