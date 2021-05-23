//LOAD MODULES
const Busboy 		= require('busboy');
const csv 			= require('fast-csv');
const express 		= require("express");

//LOAD ENV VARIABLES
const appDir = process.env.PWD;

//LOAD FUNCTIONS
const db = require(appDir + "/functions/db");

//INITIALIZE ROUTER
const router = express.Router();

//SHOW FORM
router.get("/", (req, res) => {
	res.render(appDir + "/views/import.ejs");
});

//PROCESS UPLOAD REQUEST
router.post("/", async (req, res) => {
	// Clear tables
	await db.truncateTable('teams');
	await db.truncateTable('users');
	
	let init = true;

	let busboy = new Busboy({headers: req.headers});
	// Listen for event when Busboy finds a file to stream
	busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
		//Handle incoming chunks
		file.pipe(csv.parse()).on('data', async function (data) {
			//If init is true it means it is the headers line. Ignore it.
			if (!init) {
				//Insert new team into the teams table, do nothing if team already exists
				await db.query("INSERT INTO teams (team) VALUES ($1) ON CONFLICT DO NOTHING;", [data[4].trim()]);
				//Convert the email field to null if empty (not provided)
				if (data[2] === "") data[2] = null;
				else data[2] = data[2].trim();
				//Insert new user into the users table , do nothing if email already exists 
				await db.query("INSERT INTO users (firstname, lastname, email, roledesc, team) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING;", [data[0].trim(), data[1].trim(), data[2], data[3].trim(), data[4].trim()]);
			};
			init = false;
		});
	});

	// Listen for event when Busboy is finished parsing the form
	busboy.on('finish', async function() {
		res.redirect("/serve");
	});

	// Pipe the HTTP Request into Busboy.
	return req.pipe(busboy);
});

//EXPORTS
module.exports = router;