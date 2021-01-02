const express = require('express');
const router = express.Router();
const hashtagController = require('../../controller/hashtagController');

router.get('/', hashtagController.getHashtag);

module.exports = router;