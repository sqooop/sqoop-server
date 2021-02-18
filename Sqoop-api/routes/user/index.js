const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');

router.post('/signup', userController.signup); // ⚡
router.post('/signin', userController.signin); // ⚡
router.get('/findEmail', userController.findEmail);
router.post('/resetPassword', userController.resetPassword);
// 이 밑에꺼는 미완
router.get('/setting', userController.getSetting); // Todo
router.put('/setting/emailCheck', userController.checkEmail); // Todo
router.put('/setting/smsCheck', userController.checkSms); // Todo
router.get('/setting/password', userController.checkPassword); // Todo
router.put('/setting/password', userController.changePassword); // Todo
router.delete('/withdraw', userController.withdrawUser); // Todo

module.exports = router;