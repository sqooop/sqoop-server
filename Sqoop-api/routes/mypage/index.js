const express = require('express'); 
const router = express.Router();
const upload = require('../../modules/multer');
const myPageController = require('../../controller/myPageController');

router.get('/', myPageController.getMyPage);
router.put('/update', upload.single('profileImg'), myPageController.updateMyPage);

module.exports = router;