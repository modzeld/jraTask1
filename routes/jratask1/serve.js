//LOAD MODULES
const express = require("express");

//LOAD ENV VARIABLES
const appDir = process.env.PWD;

//LOAD FUNCTIONS
const db = require(appDir + "/functions/db");

//INITIALIZE ROUTER
const router = express.Router();

//SHOW FORM
router.get("/serve", (req, res) => {
	res.status(200).send("Let's go SERVE!")
});

//EXPORTS
module.exports = router;