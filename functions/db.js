//LOAD MODULES
const { Client } = require('pg')

//DEFINE OBJECT TO EXPORT
let obj = new Object();

//DEFINE FUNCTIONS
// Proper error handling not implemented, so try/catch skipped.

obj.query = async function(text, values = []){
	let client = new Client();
	await client.connect();
	const res = await client.query(text, values);
	await client.end();
	return res;;
};

obj.test = async function(){
	const res = await obj.query('SELECT NOW() AS "theTime"');
	return console.log("DB SEEMS OK: " + res.rows[0].theTime);
};

obj.truncateTable = async function(name){
	const res = await obj.query('TRUNCATE TABLE ' + name + " CASCADE");
	return res;
};

obj.dropTable = async function(name){
	const res = await obj.query('DROP TABLE IF EXISTS ' + name + " CASCADE");
};

obj.createTeamsTable = async function(){
	const res = await obj.query(`CREATE TABLE IF NOT EXISTS teams (
		id SERIAL, 
		team VARCHAR, 
		PRIMARY KEY (id), 
		UNIQUE (team)
	);`);
	return res;
};

obj.createUsersTable = async function(){
	const res = await obj.query(`CREATE TABLE IF NOT EXISTS 
		users (
			id SERIAL, 
			firstname VARCHAR, 
			lastname VARCHAR, 
			email VARCHAR, 
			roledesc VARCHAR, 
			team VARCHAR, 
			PRIMARY KEY (id),
			FOREIGN KEY (team) REFERENCES teams(team) ON DELETE CASCADE
		); 
		CREATE UNIQUE INDEX indUniqueNull ON users(email) WHERE email IS NOT NULL;`
	);
	return res;
};

//EXPORTS
module.exports = obj;