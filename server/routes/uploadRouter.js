const express = require('express')
const fs = require('fs-extra')
const multer = require('multer')
const bodyParser = require('body-parser')
const router = express.Router()
const mainController = require('../controllers/main')



router.post('/', upload.any(), mainController.uploadFiles)


module.exports = router