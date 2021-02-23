const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');
const auth = require('../../middlewares/authUtils');

router.post('/signup', userController.signup); // ⚡
router.post('/signin', userController.signin); // ⚡
router.get('/findEmail', userController.findEmail);
router.get('/checkEmail', userController.checkEmail);
router.get('/checkPhone', userController.checkPhone);
router.post('/resetPassword', userController.resetPassword);


router.get('/getUserSetting', auth.checkToken, userController.getUserSetting);
router.post('/changePassword', auth.checkToken, userController.changePassword);
router.post('/setMarketing', auth.checkToken, userController.setMarketing);
router.post('/deleteAccount', auth.checkToken, userController.deleteAccount);



module.exports = router;