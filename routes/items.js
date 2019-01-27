const express = require('express');
const router  = express.Router();

const { Item } = require('../database/models');

router.get('/home', (req, res, next) => {
	Item.findAll({ where: { taken: false }, limit: 9 }).then(resp => {
		res.json(resp);
	})
});

module.exports = router;