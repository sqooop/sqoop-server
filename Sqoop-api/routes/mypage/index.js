const express = require('express'); 
const router = express.Router();
const myPageController = require('../../controller/myPageController');

router.get('/', myPageController.getMyPage);
// router.put('',);

module.exports = router;