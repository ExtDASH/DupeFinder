const express = require('express')
const router = express.Router()
const mainController = require('../controllers/main')

// Clean this up

router.get('/base', mainController.getNums)
router.get('/yodel', mainController.getYodelNums)
router.get('/searchcsv', mainController.searchCSV)
router.get('/csvput', mainController.csvPut)
router.post('/post', mainController.addNums)
// router.post('/base', mainController.postNums)
// router.post('/yodel', mainController.postYodelNums)


module.exports = router