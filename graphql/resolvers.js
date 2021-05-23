//LOAD ENV VARIABLES
const appDir = process.env.PWD;

//LOAD FUNCTIONS
const db = require(appDir + "/functions/db");

//EXPORTS
module.exports = {
	users: async function () {
		let res = await db.query('SELECT * FROM users ORDER BY id ASC');
		let users = res.rows;
		return {
			users: users
		};
	},
	teams: async function () {
		let res = await db.query('SELECT * FROM teams ORDER BY id ASC');
		let teams = res.rows;
		for (let team of teams) {
			let res2 = await db.query("SELECT * FROM users WHERE team='" + team.team + "' ORDER BY id ASC");
			team.users = res2.rows;
		};
		return {
			teams: teams
		};
	}
};