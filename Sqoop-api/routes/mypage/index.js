const express = require('express'); 
const router = express.Router();
const upload = require('../../modules/multer');
const myPageController = require('../../controller/myPageController');
// const fileSizeFilter = require('../../middlewares/fileSizeFilter');

router.get('/', myPageController.getMyPage);
router.put('/update', upload.single('profileImg'), myPageController.updateMyPage);
// router.put('/update', fileSizeFilter.sizeFilter, myPageController.updateMyPage); 
// 밑에 거는 그냥 혹시 용량 제한 서버에서 할경우 대비용?


module.exports = router;