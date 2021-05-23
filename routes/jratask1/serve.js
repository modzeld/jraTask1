//LOAD MODULES
const express = require("express");

//LOAD ENV VARIABLES
const appDir = process.env.PWD;

//LOAD FUNCTIONS
const db = require(appDir + "/functions/db");

//INITIALIZE ROUTER
const router = express.Router();

//SHOW FORM
router.get("/serve", async (req, res) => {
	//Get users table
	let res1 = await db.query('SELECT * FROM users ORDER BY id ASC');
	let users = res1.rows;
	//Get teams table
	let res2 = await db.query('SELECT * FROM teams ORDER BY id ASC');
	let teams = res2.rows;
	//Fill teams with users
	for (let team of teams) {
		let res3 = await db.query("SELECT * FROM users WHERE team='" + team.team + "' ORDER BY id ASC");
		team.users = res3.rows;
	};
	res.render(appDir + "/views/serve.ejs", {users:users, teams:teams});
});

//EXPORTS
module.exports = router;