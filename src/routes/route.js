const express = require('express')
const router = express.Router()

const {Dictionary} = require('../controllers/vocabController')
const {addToDB} = require('../controllers/addToDbController')
const {getAddedWords} = require('../controllers/getAddedWordsController')
const {wordDetails}=require('../controllers/wordDetails')

router.post('/Dictionary', Dictionary)
router.post('/addToDB', addToDB)
router.get('/getAddedWords', getAddedWords)
router.post('/wordDetails',wordDetails)

module.exports = router