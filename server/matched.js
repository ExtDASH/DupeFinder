const mongoose = require('mongoose')

const matched = mongoose.Schema ({
	phone: Number,
	fname: String,
	lname: String,
	address: String,
	city: String,
	state: String,
	zipcode: Number,
})

module.exports = mongoose.model('matched', matched)