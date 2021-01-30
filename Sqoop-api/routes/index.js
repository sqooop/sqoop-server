const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authUtils');

router.use('/user', require('./user'));
router.use('/activity', auth.checkToken, require('./activity'));
router.use('/card', auth.checkToken, require('./card'));
router.use('/question', auth.checkToken, require('./question'));
router.use('/hashtag', auth.checkToken, require('./hashtag'));
router.use('/mypage', auth.checkToken, require('./mypage'));
// router.use('/multer', require('./multer'));

module.exports = router;
