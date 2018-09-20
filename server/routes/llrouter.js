const express = require('express')
const fs = require('fs-extra')
const multer = require('multer')
const bodyParser = require('body-parser')
const router = express.Router()
const llCont = require('../controllers/llCont.js')

router.get('/', llCont.getLLs)
router.post('/', llCont.postLLs)

module.exports = router