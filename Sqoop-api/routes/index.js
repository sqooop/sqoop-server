const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authUtils');

router.use('/user', require('./user'));
router.use('/activity', auth.checkToken, require('./activity'));
router.use('/card', auth.checkToken, require('./card'));
router.use('/question', auth.checkToken, require('./question'));
router.use('/hashtag', auth.checkToken, require('./hashtag'));
// router.use('/multer', require('./multer'));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
