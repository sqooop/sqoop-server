const express = require('express');
const router = express.Router();
const upload = require('../../modules/multer');
const multerController = require('../../controller/multerController');

router.post('/single/:id', upload.single('image'), multerController.uploadImgOnThePost); // image가 키값
// multer 컨트롤러랑 라우팅 필요 없을듯?
// 이야기해보고 필요없으면 지워도 될 듯
module.exports = router;