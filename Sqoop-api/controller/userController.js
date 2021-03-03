const user = require('../models/user');
const userService = require('../service/userService');

module.exports = {
    signup: async (req, res) => {
        const { email, userName, password, birthday, phoneNumber } = req.body;
        const newUser = await userService.signup(email, userName, password, birthday, phoneNumber, res);
        return newUser;
    },
    signin: async (req, res) => {
        const { email, password } = req.body;
        const user = await userService.signin(email, password, res);
        return user;
    },
    findEmail: async (req, res) => {
        const { userName, birthday, phoneNumber } = req.query;
        const userEmail = await userService.findEmail(userName, birthday, phoneNumber, res);
        return userEmail;
    },
    resetPassword: async (req, res) => {
        const { email } = req.body;
        const resetPW = await userService.resetPassword(email, res);
        return resetPW;
    },

    checkEmail: async (req, res) => {
        const { email } = req.query;
        const checkEmail = await userService.checkEmail(email, res);
        return checkEmail;
    },
    checkPhone: async (req, res) => {
        const { phone } = req.query;
        const checkPhone = await userService.checkPhone(phone, res);
        return checkPhone;
    },
    getUserSetting: async (req, res) => {
        const userId = req.decoded.id;
        const getUserSetting = await userService.getUserSetting(userId, res);
        return getUserSetting;
    },
    checkPassword: async (req, res) => {
        const userId = req.decoded.id;
        const { password } = req.query;
        const checkPassword = await userService.checkPassword(userId, password, res);
        return checkPassword;
    },
    changePassword: async (req, res) => {
        const userId = req.decoded.id;
        const { inputPW, newPW } = req.body;
        const changePassword = await userService.changePassword(userId, inputPW, newPW, res);
        return changePassword;
    },
    setMarketing: async (req, res) => {
        const userId = req.decoded.id;
        const { checkMarketing } = req.body;
        const setMarketing = await userService.setMarketing(userId, checkMarketing, res);
        return setMarketing;
    },
    deleteAccount: async (req, res) => {
        const userId = req.decoded.id;
        const { reason, inputPW } = req.body;
        const deleteAccount = await userService.deleteAccount(userId, reason, inputPW, res);
        return deleteAccount;
    },


}