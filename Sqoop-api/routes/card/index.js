const express = require('express');
const router = express.Router();
const cardController = require('../../controller/cardController');

router.post('/create', cardController.createCard);

module.exports = router;