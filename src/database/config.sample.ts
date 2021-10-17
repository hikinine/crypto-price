import { Sequelize } from 'sequelize';


const db = new Sequelize('crypto', '', '', {
	host: "localhost",
	dialect: "mariadb",
	logging: false,
	dialectOptions: {
		options: {
			requestTimeout: 55000
		}
	},
	pool: {
		idle: 60000,
		max: 30,
		
	}
});

export default db;
