const jwt = require('../modules/jwt');
const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const userMethod = require('../method/userMethod');
const crypto = require('crypto');


module.exports = {
    signup: async (email, userName, password, res) => {
        if (!email || !password || !userName) {
            console.log('필요값 누락');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try {
            const alreadyEmail = await userMethod.readOneEmail(email);
            if (alreadyEmail) {
                console.log('이미 존재하는 이메일');
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID));
            }
            const user = await userMethod.createUser(email, userName, password);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_UP_SUCCESS, { id: user.id, email, userName }));

        } catch (err) {
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_UP_FAIL));
        }
    },
    signin: async (logEmail, logPassword, res) => {
        if (!logEmail || !logPassword) {
            console.log('필요값 누락');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try {
            const user = await userMethod.readOneEmail(logEmail);
            if (!user) {
                console.log('없는 이메일');
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
            }
            const { id, email, userName, salt, password } = user;
            const inputPassword = await crypto.pbkdf2Sync(logPassword, salt, 10000, 64, 'sha512').toString('base64');
            if (inputPassword !== password) {
                console.log('비밀번호가 일치하지 않음');
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW));
            }
            const { accessToken } = await jwt.sign(user);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_IN_SUCCESS, { id, email, userName, accessToken }));

        } catch (err) {
            console.log(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_IN_FAIL));
        }
    }

}