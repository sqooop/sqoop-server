const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/post', require('./post'));
router.use('/multer', require('./multer'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
