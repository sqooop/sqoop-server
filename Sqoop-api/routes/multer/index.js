const express = require('express');
const router = express.Router();
const upload = require('../../modules/multer');

router.post('/single', upload.single('image'), ()=>{}); // image가 키값

module.exports = router;