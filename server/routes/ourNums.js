const express = require('express')
const router = express.Router()
const mainController = require('../controllers/main')

router.get('/', mainController.getNums)
router.get('/searchcsv', mainController.searchCSV)
router.get('/csvput', mainController.csvPut)
router.put('/putem', mainController.putEm)
router.post('/', mainController.postNums)
router.get('/yodel', mainController.getYodelNums)
router.post('/yodel', mainController.postYodelNums)

module.exports = router