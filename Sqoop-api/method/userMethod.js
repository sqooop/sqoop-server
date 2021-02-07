const crypto = require('crypto');
const {
    User,
    Education,
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
    createUser: async (email, userName, password) => {
        try {
            transaction = await sequelize.transaction();
            const salt = crypto.randomBytes(64).toString('base64');
            const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
            const user = await User.create({
                email,
                password: hashedPassword,
                userName,
                salt,
                // 여기부터 마이페이지로 인한 추가정보
                profileImg: "",
                birthday: "",
                phone: "",
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
    getMyPage: async (UserId) => {
        try {
            const myPageInfo = await User.findOne({
                where: {
                    id: UserId
                },
                attributes: {
                    exclude: ['id', 'password', 'salt']
                },
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
    updateMyPage: async (
        UserId,
        userName,
        profileImg,
        birthday,
        phone,
        sns,
        jobBig,
        jobSmall,
        skillBig,
        skillSmall,
        introduce) => {
        try {
            transaction = sequelize.transaction();
            await User.update({
                userName,
                profileImg,
                birthday,
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
            await transaction.commit();

            return "마이페이지 수정 완료";
        } catch (err) {
            if(transaction) await transaction.rollback();
            throw err;
        }
    },
}