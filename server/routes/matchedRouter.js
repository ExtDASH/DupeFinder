const express = require('express')
const fs = require('fs-extra')
const multer = require('multer')
const bodyParser = require('body-parser')
const router = express.Router()
const matchedCont = require('../controllers/matchedCont.js')

router.post('/', matchedCont.postMatched)

module.exports = router