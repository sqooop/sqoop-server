const express = require('express'); 
const router = express.Router();
const questionController = require('../../controller/questionController');

router.get('/', questionController.getQuestions);

module.exports = router;