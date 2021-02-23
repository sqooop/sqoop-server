const crypto = require('crypto');
const {
    User,
    Education,
    History,
    sequelize
} = require('../models');
let transaction;

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
    createUser: async (email, userName, password, birthday, phoneNumber) => {
        try {
            transaction = await sequelize.transaction();
            const salt = crypto.randomBytes(64).toString('base64');
            const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
            const user = await User.create({
                email,
                password: hashedPassword,
                userName,
                salt,
                birthday,
                phone: phoneNumber,
                // 여기부터 마이페이지로 인한 추가정보
                profileImg: "",
                sns: "",
                jobBig: "",
                jobSmall: "",
                skillBig: "",
                skillSmall: "",
                introduce: "",
            }, {
                transaction
            });
            await transaction.commit();

            return user;
        } catch (err) {
            if (transaction) await transaction.rollback();
            throw err;
        }
    },
    getMyPage: async (UserId, transaction) => {
        try {
            const myPageInfo = await User.findOne({
                where: {
                    id: UserId
                },
                attributes: {
                    exclude: ['password', 'salt', 'emailSend', 'smsSend']
                },
                include: [{
                    model: Education,
                    attributes: ['school', 'startDate', 'endDate', 'major'],
                }, {
                    model: History,
                    as: 'History',
                    attributes: ['title', 'date', 'testName', 'score', 'type'],
                }],
                transaction
            });

            return myPageInfo;
        } catch (err) {
            throw err;
        }
    },
    updateMyPage: async (
        UserId,
        profileEmail,
        profileImg,
        phone,
        sns,
        jobBig,
        jobSmall,
        skillBig,
        skillSmall,
        introduce,
        transaction) => {
        try {
            await User.update({
                profileEmail,
                profileImg,
                phone,
                sns,
                jobBig,
                jobSmall,
                skillBig,
                skillSmall,
                introduce
            }, {
                where: {
                    id: UserId
                },
                transaction
            });

            return "마이페이지 수정 완료";
        } catch (err) {
            throw err;
        }
    },
    findUserEmail: async (userName, birthday, phoneNumber) => {
        try {
            const userEmail = await User.findOne({
                where: {
                    userName: userName,
                    birthday: birthday,
                    phone: phoneNumber
                },
                attributes: ['email']
            });
            return userEmail;
        } catch (err) {
            throw err;
        }
    },
    resetPassword: async (email, salt, hashedPassword) => {
        try {
            await User.update({
                salt,
                password: hashedPassword
            }, {
                where: {
                    email
                }
            });
            return "비밀번호 리셋 성공"
        } catch (err) {
            throw err;
        }

    }
}