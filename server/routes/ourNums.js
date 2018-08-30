const express = require('express')
const router = express.Router()
const mainController = require('../controllers/main')

router.get('/', mainController.getNums)
router.post('/', mainController.postNums)

module.exports = router