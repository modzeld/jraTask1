//LOAD MODULES
const fs 	= require('fs');
const path 	= require('path');

//LOAD ENV VARIABLES
const appDir = process.env.PWD;

//INITIALIZE OTHER VARIABLES
const pathSeparator = path.sep;
const routesDir 	= appDir + pathSeparator + "routes";

//LIST ALL ROUTES IN THE FOLDER
let filePaths = new Array;
let listAllFiles = function (dir) {
	fs.readdirSync(dir).forEach(file => {
		const filePath = path.join(dir, file);
		if (fs.statSync(filePath).isDirectory()) return listAllFiles(filePath);
		if (dir === routesDir && path.basename(file) === 'index.js') return;
        filePaths.push(filePath);
	});
};

//EXPORT
module.exports = function (app) {
	filePaths = [];
	listAllFiles(routesDir);
	//LOAD ALL ROUTES
	filePaths.forEach(file => {
		app.use(require(file));
	});
	//404 ROUTE
	app.use(function(req, res, next) {
		res.status(404).send("404: Sorry can't find that!")
	});
};