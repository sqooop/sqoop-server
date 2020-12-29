const express = require('express');
const router = express.Router();
const hashtagController = require('../../controller/hashtagController');

router.post('/create', hashtagController.createHashtag);

module.exports = router;