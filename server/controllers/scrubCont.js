const csv = require('csvtojson')
const bodyParser = require('body-parser')
const scrubbedSchemas = require('../scrubbed.js')
const demoS = require('../democrats.js')
const mongoose = require('mongoose')
mongoose.set('debug', true)
const fs = require('fs-extra')
const multer = require('multer')

module.exports = {
	scruber: function(req, res, next) {
		let matched = []
		let dems = []
		regex = /\b[a-zA-Z]{2,}/g
		
		
		demoS.find()
			.then(obj => {
				for(var i = 0; i < obj.length; i++){
					dems.push(obj[i])
				}
				
				console.log('done finding dems')
				dems.forEach(function(element){
					var modifiedfname = element.fn.replace(regex, function(match) {
					    return match.toUpperCase();
					})
					// var modifiedlname = element.ln.replace(regex, function(match) {
					//     return match.toUpperCase();
					// })
					scrubbedSchemas.find({ fname: modifiedfname }, function(err, docs){
						if (err){
							res.render(err)
						} else {
							res.status(200).json(docs)
						}
					})
				})
			})
			


		

			

	}
}