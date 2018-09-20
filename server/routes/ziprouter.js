const express = require('express')
const fs = require('fs-extra')
const multer = require('multer')
const bodyParser = require('body-parser')
const router = express.Router()
const zipCont = require('../controllers/zipsController.js')

router.get('/', zipCont.getZips)
router.post('/', zipCont.postZips)

module.exports = router