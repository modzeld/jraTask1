"use strict";

//LOAD DEPENDENCIES
const dotenv 	= require("dotenv");
const express 	= require("express");

//LOAD FUNCTIONS
const db = require("./functions/db");

//LOAD PROCESS.ENV VARIABLES FROM THE .ENV FILE
dotenv.config();

//SET DEFAULT PATH VARIABLE IF PWD NOT AVAILABLE
if (!process.env.PWD) process.env.PWD = process.cwd();

//INITIALIZE EXPRESS
const app = express();

//EXIT ON UNHANDLED ERRORS AND REPORT PROMISE REJECTIONS
//I hope noone sees this primitive error catcher below, that should be a proper error handler instead. Let's go! :)

process
.on('unhandledRejection', (reason, p) => {
	console.error(reason, 'Unhandled rejection at promise ', p);
})
.on('uncaughtException', err => {
	console.error(err, 'Uncaught exception thrown.');
	process.exit(1); //1: err code 1
});

//INITIALIZE DATABASE
require('./loaders/db')();

//INITIALIZE GRAPHQL SERVER
require('./loaders/graphql')(app);

//LOAD ROUTES
require('./routes')(app);

//START THE SERVER
const server = app.listen(process.env.PORT, process.env.HOST, function(){
	console.log('Listening for connections.');
	if(process.send instanceof Function) process.send('ready');
});