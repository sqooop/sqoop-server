const userService = require('../service/userService');

module.exports = {
    signup: async (req, res) => {
        const { email, userName, password } = req.body;
        const newUser = await userService.signup(email, userName, password, res);
        return newUser;
    },
    signin: async (req, res) => {
        const { email, password } = req.body;
        const user = await userService.signin(email, password, res);
        return user;
    }
}