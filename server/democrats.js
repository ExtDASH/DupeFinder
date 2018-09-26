const mongoose = require('mongoose')
demoS = mongoose.Schema ({
	fn: String,
	mn: String,
	ln: String,
	suffix: String,
	streetNo: Number,
	StreetNoHalf: Number,
	StreetPrefix: String,
	StreetName: String,
	StreetType: String,
	StreetSuffix: String,
	AptType: String,
	AptNo: Number,
	ct: String,
	st: String,
	zip: Number,
	zip2: Number,
	phone1: Number,
	phone2: Number,
	email: String,
	DOB: String
})

module.exports = mongoose.model('democratSchema', demoS)