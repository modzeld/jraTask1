//LOAD MODULES
const express 		= require("express");

//LOAD ENV VARIABLES
const appDir = process.env.PWD;

//LOAD FUNCTIONS
const db = require(appDir + "/functions/db");

//INITIALIZE ROUTER
const router = express.Router();

//EXPORTS
// Proper error handling not implemented, so try/catch skipped.
module.exports = async function () {
	await db.test();
	await db.dropTable('teams');
	await db.dropTable('users');
	await db.createTeamsTable();
	await db.createUsersTable();
};