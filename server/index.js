const express = require('express')
const connect = require('connect')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fs = require('fs-extra')
const multer = require('multer')
const getRouter = require('./routes/ourNums')
const uploadRouter = require('./routes/uploadRouter')
const path = require('path')


const storage = multer.diskStorage({
	destination: './uploads/',
	filename: function(req, file, cb){
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})

const upload = multer({ 
	storage: storage 
}).single('Ncsv')

const app = express()



app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(morgan('tiny')) //watching for changes
app.use(express.static(`${__dirname}/../client`))

app.post('/upload', (req, res) => {
	upload(req, res, (err) => {
		if(err){
			console.log(err)
		} else {
			console.log(req.file)
			
		}
	})
})
app.use('/upload', uploadRouter)
app.use('/getnums', getRouter)
app.use('/searchcsv', getRouter)
app.use('/getnums/csvput', getRouter)




mongoose.connect('mongodb://allclients:allclients1@ds021172.mlab.com:21172/yodeldidschecker', { useNewUrlParser: true })
	.then(() => {
		app.listen(1337)
	})
