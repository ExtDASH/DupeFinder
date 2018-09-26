const mongoose = require('mongoose')
scrubbedSchemas = mongoose.Schema ({
	fname: String,
	lname: String,
	phone: Number,
	address: String,
	city: String,
	state: String,
	zipcode: Number,
})
module.exports = mongoose.model('scrubbedSchema', scrubbedSchemas);