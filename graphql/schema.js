//LOAD MODULES
const { buildSchema } = require('graphql');

//EXPORTS
module.exports = buildSchema(`
	type User {
		id: Int!
		firstname: String
		lastname: String
		email: String
		roledesc: String
		team: String
	}

	type UserData {
		users: [User!]
	}

	type Team {
		id: Int!
		team: String
		users: [User!]
	}

	type TeamData {
		teams: [Team!]
	}

	type RootQuery {
		users: UserData
		teams: TeamData
	}

	schema {
		query: RootQuery
	}
`);