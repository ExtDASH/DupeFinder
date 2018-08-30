const csv = require('csvtojson')
const bodyParser = require('body-parser')
const numSchem = require('../schema.js')

module.exports = {
	getNums: (req, res, next) => {
		const csvFilePath = `${__dirname}/../../client/readFrom/main.csv`
		csv({
			output:"line",
		}).fromFile(csvFilePath)
			.then(jsonObj => {
				return res.status(200).json(jsonObj)
			})
			.catch(e => {
				req.error = e
				next()
			})
	},
	postNums: (req, res, next) => {
		console.log(req.body)
		numSchem.create({
			field1: req.body.field1
		})
		.then(data => res.status(201).json(data))
		.catch(e => {
			req.error = e
			console.log(e)
			next()
		})
	},
}