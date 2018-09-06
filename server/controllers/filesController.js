const csv = require('csvtojson')
const bodyParser = require('body-parser')
const numSchem = require('../schema.js')
const yodelSchema = require('../yodelSchema.js')
const fs = require('fs-extra')
const multer = require('multer')

module.exports = {

	viewFiles: (req, res, next) => {
		console.log('konnichiwa!')
	},

}