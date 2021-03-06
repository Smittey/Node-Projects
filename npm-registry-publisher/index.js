 /*************************************************************************
  *
  * @description
  * Node.js script which traverses a specified directory looking for node
  * modules. For every module found it publishes it to your registry.
  *
  * @author
  * Andy Smith, 2016
  *
  *************************************************************************/

 var fs = require('fs');
 var path = require('path');
 const exec = require('child_process').exec;

 var directory;
 var registry = "";

 var run, filePath, stat, fileName;
 var cmd = "npm publish";


 if (process.argv.indexOf("-d") != -1) {
 	directory = process.argv[process.argv.indexOf("-d") + 1];
 	console.log("Traversing: " + directory);
 } else if (process.argv.indexOf("--directory") != -1) {
 	directory = process.argv[process.argv.indexOf("--directory") + 1];
 	console.log("Traversing: " + directory);
 }

 if (process.argv.indexOf("-r") != -1) {
 	registry = process.argv[process.argv.indexOf("-r") + 1];
 	cmd += " --registry " + registry;
 	console.log("Using registry: " + registry);
 } else if (process.argv.indexOf("--registry") != -1) {
 	registry = process.argv[process.argv.indexOf("--registry") + 1];
 	cmd += " --registry " + registry;
 	console.log("Using registry: " + registry);
 } else {
 	run = exec("npm config get registry", function (err, stdout, stderr) {

 			if (stdout)
 				console.log("Using registry: " + stdout);
 			if (err)
 				console.log(err);
 			if (stderr)
 				console.log(stderr);
 		});
 }

 if (directory != undefined) {
 	walk(directory);
 } else {
 	console.log("Error, no directory specified. Please do so using -d");
 	console.log("Example: node index.js -d /path/to/directory -r url:8081/nexus/content/repositories/npm/");
 }

 function walk(currentDirPath) {
 	fs.readdir(currentDirPath, function (err, files) {
 		if (err)
 			throw new Error(err);

 		files.forEach(function (name) {
 			filePath = path.join(currentDirPath, name);
 			stat = fs.lstatSync(filePath);

 			if (stat.isFile()) {
 				fileName = path.basename(filePath);

 				if (fileName == "package.json") {
 					console.log("Found module at: " + currentDirPath);
 					run = exec(cmd, {
 							cwd : currentDirPath
 						}, function (err, stdout, stderr) {

 							if (stdout)
 								console.log(stdout);
 							if (err)
 								console.log(err);
 							if (stderr)
 								console.log(stderr);
 						});
 				}
 			} else if (stat.isDirectory()) {
 				walk(filePath);
 			}
 		});
 	});
 }