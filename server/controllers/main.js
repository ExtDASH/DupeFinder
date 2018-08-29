const csv = require('csvtojson')

module.exports = {
	getNums: (req, res, next) => {
		const csvFilePath = `${__dirname}/../../client/readFrom/main.csv`
		csv().fromFile(csvFilePath)
			.then(jsonObj => res.send(jsonObj))
			.catch(e => {
				req.error = e
				next()
			})
	},
}