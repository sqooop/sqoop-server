const jwt = require('../modules/jwt');
const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const userMethod = require('../method/userMethod');
const crypto = require('crypto');
const nodeMailer = require('nodemailer');

module.exports = {
    signup: async (email, userName, password, birthday, phoneNumber, res) => {
        if (!email || !password || !userName || !birthday || !phoneNumber) {
            console.log('필요값 누락');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try {
            const alreadyEmail = await userMethod.readOneEmail(email);
            if (alreadyEmail) {
                console.log('이미 존재하는 이메일');
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID));
            }
            const user = await userMethod.createUser(email, userName, password, birthday, phoneNumber);
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
    },
    findEmail: async (userName, birthDay, phoneNumber, res) => {
        if (!userName || !birthDay || !phoneNumber) {
            console.log('필요값 누락');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try {
            let userEmail = await userMethod.findUserEmail(userName, birthDay, phoneNumber);
            let splitEmail = userEmail.email.split('@');
            let splitEmailFront = splitEmail[0];
            let splitEmailBack = splitEmail[1];

            splitEmailFront = splitEmailFront.slice(0, splitEmailFront.length - 3);
            const hideEmail = "***";
            splitEmailFront = splitEmailFront.concat(hideEmail);
            userEmail = splitEmailFront.concat('@', splitEmailBack);

            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_EMAIL_SUCCESS, { userEmail }));
        } catch (err) {
            console.log(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_EMAIL_FAIL));
        }
    },
    resetPassword: async (userEmail, res) => {
        if (!userEmail) {
            console.log('필요값 누락');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try {
            let emailExist = userMethod.readOneEmail(userEmail);
            if (!emailExist) {
                console.log('존재하지 않는 이메일');
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_EMAIL));
            }
            const { gMail, gPassword } = require('../config/gmail.json');
            const smtpTransport = nodeMailer.createTransport({
                service: "Gmail",
                auth: {
                    user: gMail,
                    pass: gPassword
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            const temporaryPw = Math.random().toString(36).slice(2);

            let mailOptions = {
                from: gMail,
                to: userEmail,
                subject: "Sqoop 임시 비밀번호 입니다",
                text: temporaryPw
            };

            const salt = crypto.randomBytes(64).toString('base64');
            const hashedResetPassword = crypto.pbkdf2Sync(temporaryPw, salt, 10000, 64, 'sha512').toString('base64');

            await smtpTransport.sendMail(mailOptions, async (err) => {
                if (err) {
                    console.log('nodeMailer Error');
                    smtpTransport.close();
                    throw err;
                } else {
                    await userMethod.resetPassword(userEmail, salt, hashedResetPassword);
                    smtpTransport.close();
                    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.RESET_PASSWORD_SUCCESS));
                }
            });

        } catch (err) {
            console.log(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.RESET_PASSWORD_FAIL));
        }
    },
    checkPhone: async (phone, res) => {
        if (!phone) {
            console.log('필요값 누락');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try {
            const alreadyPhone = await userMethod.readOnePhone(phone);
            if (alreadyPhone) {
                console.log('이미 존재하는 폰번호');
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_PHONE));
            } else {
                return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.PHONE_CHECK_SUCCESS));
            }
        } catch (err) {
            console.log(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.PHONE_CHECK_FAIL));
        }
    },
    checkEmail: async (email, res) => {
        if (!email) {
            console.log('필요값 누락');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try {
            const alreadyEmail = await userMethod.readOneEmail(email);
            if (alreadyEmail) {
                console.log('이미 존재하는 이메일');
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID));
            } else {
                return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.EMAIL_CHECK_SUCCESS));
            }
        } catch (err) {
            console.log(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.EMAIL_CHECK_FAIL));
        }
    },
    getUserSetting: async (userId, res) => {
        try {
            const userSetting = await userMethod.getUserSetting(userId);
            if (!userSetting) {
                throw err;
            } else {
                return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_USER_SET_SUCCESS, { userSetting }));
            }
        } catch (err) {
            console.log(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.GET_USER_SET_FAIL));
        }
    },
    changePassword: async (userId, inputPW, newPW, res) => {
        if (!inputPW || !newPW) {
            console.log('필요값 누락');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try {
            const userPW = await userMethod.getUserPW(userId);
            if (!userPW) {
                throw err;
            }
            const { password, salt } = userPW;
            const passwordCompare = await crypto.pbkdf2Sync(inputPW, salt, 10000, 64, 'sha512').toString('base64');
            if (passwordCompare !== password) {
                console.log('비밀번호가 일치하지 않음');
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW));
            } else {
                const newSalt = crypto.randomBytes(64).toString('base64');
                const newHashedPassword = crypto.pbkdf2Sync(newPW, newSalt, 10000, 64, 'sha512').toString('base64');
                await userMethod.changePassword(userId, newSalt, newHashedPassword);
                return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.CHANGE_PW_SUCCESS));
            }


        } catch (err) {
            console.log(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CHANGE_PW_FAIL));
        }
    },
    setMarketing: async (userId, checkMarketing, res) => {
        try {
            let boxChecked;
            if (checkMarketing === undefined || checkMarketing === false) {
                boxChecked = false;
            } else {
                boxChecked = true;
            }
            await userMethod.setMarketing(userId, boxChecked);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SET_MARKETING_SUCCESS));
        } catch (err) {
            console.log(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SET_MARKETING_FAIL));
        }
    },
    deleteAccount: async (userId, reason, inputPW, res) => {
        try {
            const userPW = await userMethod.getUserPW(userId);
            if (!userPW) {
                throw err;
            }
            const { email, password, salt } = userPW;

            const passwordCompare = await crypto.pbkdf2Sync(inputPW, salt, 10000, 64, 'sha512').toString('base64');
            if (passwordCompare !== password) {
                console.log('비밀번호가 일치하지 않음');
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW));
            } else {
                const { gMail, gPassword } = require('../config/gmail.json');
                const smtpTransport = nodeMailer.createTransport({
                    service: "Gmail",
                    auth: {
                        user: gMail,
                        pass: gPassword
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });

                let mailOptions = {
                    from: gMail,
                    to: gMail,
                    subject: `${email} 님이 Sqoop을 탈퇴하였습니다`,
                    text: reason
                };


                await smtpTransport.sendMail(mailOptions, async (err) => {
                    if (err) {
                        console.log('nodeMailer Error');
                        smtpTransport.close();
                        throw err;
                    } else {
                        await userMethod.deleteAccount(userId);
                        smtpTransport.close();
                        return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.DELETE_ACCOUNT_SUCCESS));
                    }
                });
            }

        } catch (err) {
            console.log(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.DELETE_ACCOUNT_FAIL));
        }
    }



}