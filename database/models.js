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
	taken: {
		type: Sequelize.BOOLEAN
	}
});

module.exports = { User, Item };
