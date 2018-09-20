const mongoose = require('mongoose')

const zips = mongoose.Schema ({
	zips: Array,
})

module.exports = mongoose.model('zipSchema', zips)