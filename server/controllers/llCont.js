const csv = require('csvtojson')
const bodyParser = require('body-parser')
const llSchema = require('../landlineSchema.js')
const fs = require('fs-extra')
const multer = require('multer')

module.exports = {
	postLLs: function(req, res, next){
		const filePath = `${__dirname}/../uploads/${req.query.filename}`
		csv({
			headers: ["phone", "fname", "lname", "address", "city", "state", "zipcode"]
		})
		.fromFile(filePath)
		.then((obj) => {
			console.log(obj)
		})
		.catch(e => {
			req.error = e
			next()
		})
		
		
	},

	getLLs: function(req, res, next){
		zipSchema.find()
		.then(data => {
			return res.status(200).json({ data })
		})
		.catch(e => {
			req.error = e
			next()
		})
	}
}