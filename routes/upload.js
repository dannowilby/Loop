const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Item } = require('../database/models');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'static/images'); //path.resolve(__dirname, '/'));
	},
	filename: (req, file, cb) => {
		const username = req.user.dataValues.email;
		
		Item.findAll({ where: { user: username } }).then(resp => {
			
			let last = 0;

			if(!resp && !resp.dataValues)
				last = 0;
			else
				last = resp[resp.length - 1].dataValues.id + 1;

			cb(null, `${username}_${last}.jpeg`);
		});
	}
});



const upload = multer({ storage: storage }).single('recfile');
/* multer({ 
	dest: 'static/images', 
	fileName: (req, res, next) => {
		const username = req.user.dataValues.email;

		Item.findAll({ where: { user: username } }).then(resp => {

			const last = resp[resp.length - 1].dataValues.uid;

			return `${username}_${req.body.item_name}_${last}.jpg`;
		});
	} 
}).single('recfile');*/

router.post('/upload-item', upload, (req, res, next) => {

	const username = req.user.dataValues.email;

	Item.findAll({ where: { user: username } }).then(resp => {

		Item.create({
			name: req.body.item_name,
			user: username,
			taken: false
		}).then(() => {
			return res.json({ message: 'success' });
		});
	});	
});

module.exports = router;