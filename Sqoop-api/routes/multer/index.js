const express = require('express');
const router = express.Router();
const upload = require('../../modules/multer');
const multerController = require('../../controller/multerController');

router.post('/single/:id', upload.single('image'), multerController.uploadImgOnThePost); // image가 키값

module.exports = router;