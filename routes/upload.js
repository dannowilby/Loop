const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Item } = require('../database/models');

const debug = (message) => {
	console.log('d --------------------------------');
	console.log(message);
	console.log('d --------------------------------');
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'static/images');
	},
	filename: (req, file, cb) => {
		const username = req.user.dataValues.email;
		
		Item.findAll({ where: { user: username } }).then(resp => {
			
			let last = 1;

			if(resp[0] && resp[0].dataValues)
				last = resp[resp.length - 1].dataValues.id + 1;

			cb(null, `${username}_${last}.jpeg`);
		});
	}
});

const upload = multer({ storage: storage }).single('recfile');

router.post('/upload-item', (req, res, next) => {

	upload(req, res, (err) => {

		const username = req.user.dataValues.email;

		Item.findAll({ where: { user: username } }).then(resp => {

			Item.create({
				name: req.body.item_name,
				user: username,
				description: req.body.description,
				price: req.body.price,
				payment_type: req.body.payment_type,
				taken: false
			}).then(() => {
				return res.json({ message: 'success' });
			});
		});	

	});
});

module.exports = router;