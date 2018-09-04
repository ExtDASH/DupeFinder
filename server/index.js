const express = require('express')
const connect = require('connect')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const getRouter = require('./routes/ourNums')

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(morgan('tiny')) //watching for changes
app.use(express.static(`${__dirname}/../client`))
app.use('/getnums', getRouter)
app.use('/searchcsv', getRouter)
app.use('/getnums/csvput', getRouter)



mongoose.connect('mongodb://allclients:allclients1@ds021172.mlab.com:21172/yodeldidschecker', { useNewUrlParser: true })
	.then(() => {
		app.listen(3000)
	})
