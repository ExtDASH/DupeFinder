const csv = require('csvtojson')
const bodyParser = require('body-parser')
const zipSchema = require('../zipSchema.js')
const llSchema = require('../landlineSchema.js')
const fs = require('fs-extra')
const multer = require('multer')

module.exports = {
	postZips: function(req, res, next){
		const filePath = `${__dirname}/../uploads/${req.query.filename}`
		csv({
			headers: ["zips"]
		})
		.fromFile(filePath)
		.then((obj) => {
			console.log(obj)
			let data = []
			for (var i = 0; i < obj.length; i++){
				let num
				num = parseInt(obj[i].zips)
				data.push(num)
			}
			console.log(data)
			zipSchema.create({
				zips: data
			})
			// .then(data => res.status(200).json({ data }))
		})
		.catch(e => {
			req.error = e
			next()
		})
		
		
	},

	checkZips: function(req, res, next){
		console.log(req.query)
		llSchema.find({ zipcode: req.query.listItem })
			.then(data => {
				return res.status(200).json({ data })
			})
			.catch(e => {
				req.error = e
				next()
			})
	},

	getZips: function(req, res, next){
		zipSchema.find()
		.then(data => {
			console.log(data)
			return res.status(200).json({ data })
		})
		.catch(e => {
			req.error = e
			next()
		})
	}
}