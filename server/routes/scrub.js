const express = require('express')
const fs = require('fs-extra')
const multer = require('multer')
const bodyParser = require('body-parser')
const router = express.Router()
const scrubCont = require('../controllers/scrubCont.js')

router.get('/', scrubCont.scruber)

module.exports = router