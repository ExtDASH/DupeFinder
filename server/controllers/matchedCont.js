const csv = require('csvtojson')
const bodyParser = require('body-parser')
const matched = require('../matched.js')
const fs = require('fs-extra')
const multer = require('multer')

module.exports = {
	postMatched: function(req, res, next) {
		console.log(req.body)
		matched.insertMany(req.body, function(err, docs){
			if (err){
				console.log(err)
			} else {
				console.log(docs)
			}
		})
	}
}