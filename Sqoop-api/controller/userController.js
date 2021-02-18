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
    getSetting: async (req, res) => {
        return null;
    },
    checkEmail: async (req, res) => {
        return null;

    },
    checkSms: async (req, res) => {
        return null;

    },
    checkPassword: async (req, res) => {
        return null;

    },
    changePassword: async (req, res) => {
        return null;

    },
    withdrawUser: async (req, res) => {
        return null;
    },
}