const express = require('express');
const router = express.Router();
const cardController = require('../../controller/cardController');

router.get('/:ActivityId', cardController.getCards); // ⚡
router.post('/create', cardController.createCard); // ⚡
router.put('/update', cardController.updateCard); // ⚡

module.exports = router;