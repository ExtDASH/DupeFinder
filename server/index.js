const express = require('express')
const connect = require('connect')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fs = require('fs-extra')
const multer = require('multer')
const getRouter = require('./routes/ourNums')
// const uploadRouter = require('./routes/uploadRouter') unused for now
const filesRouter = require('./routes/filesRouter')
const path = require('path')


const app = express()


var upload = multer({ dest: 'uploads/' })


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(morgan('tiny')) //watching for changes
app.use(express.static(`${__dirname}/../client`))

app.post('/uploads', upload.single('Ncsv'), function (req, res, next) {
	// let savedName = req.file.filename
	// let pathTo = req.file.path

	// let resObj = {savedName, pathTo}
	
	// res.status(200).json(resObj)
	
})

// Clean this up and add new routes


app.use('/getnums', getRouter)
app.use('/searchcsv', getRouter)
app.use('/getnums/csvput', getRouter)


app.use('/files', filesRouter)


mongoose.connect('mongodb://allclients:allclients1@ds021172.mlab.com:21172/yodeldidschecker', { useNewUrlParser: true })
	.then(() => {
		app.listen(1337)
	})
