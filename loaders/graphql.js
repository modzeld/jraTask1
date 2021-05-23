//LOAD MODULES
const express 			= require("express");
const { graphqlHTTP } 	= require('express-graphql');
const { buildSchema } 	= require('graphql');

//LOAD ENV VARIABLES
const appDir = process.env.PWD;

//LOAD FUNCTIONS
const Schema 	= require(appDir + "/graphql/schema");
const Resolvers = require(appDir + "/graphql/resolvers");

//EXPORTS
module.exports = function (app) {
	app.use('/graphql', graphqlHTTP({
		schema: Schema,
		rootValue: Resolvers,
		graphiql: true,
	}));
};