const express = require('express')
const connect = require('connect')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fs = require('fs-extra')
const multer = require('multer')
const mults3 = require('multer-s3')
const aws = require('aws-sdk')
const path = require('path')

const nFs = require('./fileSchema.js')

const getRouter = require('./routes/ourNums')
const namesRouter = require('./routes/namesRouter.js')
const computeRouter = require('./routes/computeRouter.js')
const zipRouter = require('./routes/ziprouter.js')
const filesRouter = require('./routes/filesRouter')
const llRouter = require('./routes/llrouter.js')
const matchedRouter = require('./routes/matchedRouter.js')
const scrubRouter = require('./routes/scrub.js')

const S3_BUCKET = process.env.S3_BUCKET;


//1. create new schmas
//2. upload data, multi column csv
//2a. may need to create a new 'csvPull' thing to accept the multi columns
//3. create the 'DB switcher' thing, front and back end.
//4. route it to the checker

const app = express()


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Accept", "text/csv")
  if ('OPTIONS' === req.method) {
      //respond with 200
      res.send(200);
    }
    else {
    //move on
      next();
    }
});


app.use(express.static('./public'))

aws.config = new aws.Config();
let myCredentials = 'us-east-1:10cabfe6-049a-4d0f-8fe7-d443c98c0f38' 
let accessKey = "AKIAI5GSU5ZSXXFPWBOQ"
let secretKey = "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"
let bucketRegion = "us-east-1"

aws.config.update({
	region: bucketRegion,
	accessKeyId: accessKey,
	secretAccessKey: secretKey,
  	credentials: new aws.CognitoIdentityCredentials({
    	IdentityPoolId: myCredentials
	})
})


var s3 = new aws.S3({
	params: {Bucket: 'dupefinderuseruploads',}
})

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	    cb(null, './uploads')
	},
	filename: function (req, file, cb) {
	  	var newName = file.originalname.split(/\W+/g)
	  	var fullName = `${newName[0]}${Date.now()}.csv`
	    cb(null, fullName)
	},
})


// var upload = multer({
// 	storage: mults3({
// 		s3: s3,
// 		bucket: 'dupefinderuseruploads',
// 		metadata: function (req, file, cb) {
// 			cb(null, {fieldName: file.fieldname});
// 		},
// 		key: function (req, file, cb) {
// 			cb(null, Date.now().toString())
// 		}
// 	})
// })



// app.post('/uploads', upload.single('Ncsv'), function(req, res, next) {
// 	res.send('Successfully uploaded ' + req.files.length + ' files!')
// })
var upload = multer({ storage: storage })

app.use(express.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(morgan('tiny')) //watching for changes
app.use(express.static(`${__dirname}/../client`))

app.post('/uploads', upload.single('Ncsv'), function (req, res, next) {
	var fileName = req.file.filename
	nFs.create({
		name: fileName
	})
	.then(data => res.status(200).send())
	.catch(e => {
		req.error = e
		console.log(e)
		next()
	})
})

//I need a better way of doing this since multiple ppl will be using this. this is fine for now though i think.

const postName = (name) => {
	app.post('/filenames', function (req, res, next){
		console.log(name)
		nFs.create({
			name: `${name}`
		})
		.then(data => {
			res.status(200).send()
		})
		.catch(e => {
			req.error = e
			console.log(e)
			next()
		})
	})
}

// app.get('/sign-s3', (req, res) => {
// 	// res.set('Access-Control-Allow-Origin', '*');
//   const s3 = new aws.S3();
//   const fileName = req.query['file-name'];
//   const fileType = req.query['file-type'];
//   const s3Params = {
//     Bucket: 'dupefinderuseruploads',
//     Key: fileName,
//     Expires: 60,
//     ContentType: fileType,
//     ACL: 'public-read'
//   };

//   s3.getSignedUrl('putObject', s3Params, (err, data) => {
//     if(err){
//       console.log(err);
//       return res.end();
//     }
//     const returnData = {
//       signedRequest: data,
//       url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
//     };
//     res.write(JSON.stringify(returnData));
//     res.end();
//   });
// });

// app.post('/save-details', (req, res) => {
//   console.log(req.body)
// });

app.use('/uploads', filesRouter)
app.use('/getnums', getRouter)
app.use('/compute', computeRouter)
app.use('/zips', zipRouter)
app.use('/landline', llRouter)
// app.use('/filenames', postName)
app.use('/fileGet', namesRouter)
app.use('/matched', matchedRouter)
app.use('/scrub', scrubRouter)
// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname, 'client/', 'index.html'))
// })
// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname, 'client/', 'main.js'))
// })
// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname, 'client/', 'helper/', 'api.js'))
// })


mongoose.connect('mongodb://owner:extdash1@ds111773-a0.mlab.com:11773,ds111773-a1.mlab.com:11773/yodeldidschecker?replicaSet=rs-ds111773', { useNewUrlParser: true })
	.then(() => {
		// const PORT = process.env.PORT || 3000;
		app.listen(3000, () => {
		    // console.log(`Our app is running on port ${ PORT }`)
		})
	})
