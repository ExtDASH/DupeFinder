const csv = require('csvtojson')
const bodyParser = require('body-parser')
const numSchem = require('../schema.js')
const yodelSchema = require('../yodelSchema.js')
const fs = require('fs-extra')
const multer = require('multer')


module.exports = {
	getNums: (req, res, next) => {
		numSchem.find()
			.then(obj => {
				return res.status(200).json(obj)
			})
			.catch(e => {
				req.error = e
				next()
			})
	},

	searchCSV: (req, res, next) => {
		const filePath = `${__dirname}/../../client/readFrom/checkThis.csv`
		csv({
			noheader: true
		})
		.fromFile(filePath)
		.then((obj) => {
			return res.status(200).json(obj)
		})
		.catch(e => {
			req.error = e
			next()
		})
	},
	csvPut: (req, res, next) => {
		const filePath = `${__dirname}/../../client/readFrom/putNums.csv`
		csv({
			noheader: true
		})
		.fromFile(filePath)
		.then((obj) => {
			return res.status(200).json(obj)
		})
		.catch(e => {
			req.error = e
			next()
		})
	},

	putEm: (req, res, next) => {
		console.log(req.body.field1)
	},
	//Need to change these methods to now pull from db rather than csv
	getYodelNums: (req, res, next) => {
		const filePath = `${__dirname}/../../client/readFrom/yodelNums.csv`
		csv({
			noheader: true
		})
		.fromFile(filePath)
		.then((obj) => {
			return res.status(200).json(obj)
		})
		.catch(e => {
			req.error = e
			next()
		})
	},

	uploadFiles: (req, res, next) => {
		
			res.status(200).send()
			return
	},

	postYodelNums: (req, res, next) => {
		console.log(req.body.field1)
	},

	postNums: (req, res, next) => {
		console.log(req.body.field1)
		numSchem.create({
			field1: req.body.field1
		})
		.then(data => res.status(200).json({ data }))
		.catch(e => {
			req.error = e
			console.log(e)
			next()
		})
	},
}