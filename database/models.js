const Sequelize = require('sequelize');
const { database } = require('./database');

const User = database.define('user', {
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

const Item = database.define('item', {
	name: {
		type: Sequelize.STRING
	},
	user: {
		type: Sequelize.STRING
	},
	price: { /* Price per week */
		type: Sequelize.DECIMAL(10, 2),
	},
	payment_type: {
		type: Sequelize.STRING
	},
	description: {
		type: Sequelize.STRING
	},
	taken: {
		type: Sequelize.BOOLEAN
	}
});

module.exports = { User, Item };
