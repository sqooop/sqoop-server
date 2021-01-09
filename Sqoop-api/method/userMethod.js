const crypto = require('crypto');
const {
    User, 
    Education
} = require('../models');

module.exports = {
    readOneEmail: async (email) => {
        try {
            const alreadyEmail = await User.findOne({
                where: {
                    email
                }
            });
            return alreadyEmail;
        } catch (err) {
            throw err;
        }
    },
    createUser: async (email, userName, password) => {
        try {
            const salt = crypto.randomBytes(64).toString('base64');
            const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
            const user = await User.create({
                email,
                password: hashedPassword,
                userName,
                salt
            });
            return user;
        } catch (err) {
            throw err;
        }
    },
    getMyPage: async (UserId) => {
        try {
            const myPageInfo = await User.findOne({
                where: {
                    id: UserId
                },
                attributes: [
                    'email', 'userName'
                ],
                include: [{
                    model: Education,
                    attributes: ['school', 'startDate', 'endDate', 'major'],
                }]
            });
            return myPageInfo;
        } catch (err) {
            throw err;
        }
    },

}