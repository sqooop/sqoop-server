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
    }
}