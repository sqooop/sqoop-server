const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');

router.post('/signup', userController.signup); // ⚡
router.post('/signin', userController.signin); // ⚡
router.get('/findEmail', userController.findEmail);
router.get('/checkEmail', userController.checkEmail);
router.get('/checkPhone', userController.checkPhone);
router.post('/resetPassword', userController.resetPassword);



module.exports = router;