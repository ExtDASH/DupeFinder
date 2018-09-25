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
			let data = []
			console.log("init string to num/num to string")
			for (var i = 0; i < obj.length; i++) {
				obj[i].phone = parseInt(obj[i].phone)
				obj[i].zipcode = parseInt(obj[i].zipcode)
				data.push(obj[i])
			}
			console.log("done")
			llSchema.insertMany(data, function(error, docs){
				if (error){
					console.log(error)
				} else {
					console.log("posted")
				}
			})
			.then(data => res.status(200).json({ data }))

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