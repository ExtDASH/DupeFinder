const express = require('express')
const router = express.Router()
const mainController = require('../controllers/main')

router.get('/', mainController.getNums)
router.get('/searchcsv', mainController.searchCSV)
router.get('/csvput', mainController.csvPut)
router.put('/putem', mainController.putEm)
router.post('/', mainController.postNums)

module.exports = router