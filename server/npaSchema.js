const mongoose = require('mongoose')

const npa = mongoose.Schema ({
	FN: String,
	MN: String,
	LN: String,
	Suffix: String,
	StreetNo: Number,
	StreetPrefix: String,
	StreetName: String,
	StreetType: String,
	StreetSuffix: String,
	AptType: String,
	AptNo: Number,
	CT: String,
	ST: String,
	Zip: Number,
	Zip4: Number,
	Phone: Number,
	Phone2: Number,
	Email: String,
	DOB: String,
})

module.exports = mongoose.model('npaSchema', npa)