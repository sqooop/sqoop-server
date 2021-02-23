const crypto = require('crypto');
const {
    User,
    Education
} = require('../models');
const { checkPhone } = require('../service/userService');

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
    readOnePhone: async (phone) => {
        try {
            const alreadyPhone = await User.findOne({
                where: {
                    phone
                }
            });
            return alreadyPhone;
        } catch (err) {
            throw err;
        }
    },
    createUser: async (email, userName, password, birthday, phoneNumber) => {
        try {
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
            },
                {
                    where: {
                        id: UserId
                    }
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
                salt, password: hashedPassword
            }, {
                where: { email }
            });
            return "비밀번호 리셋 성공"
        } catch (err) {
            throw err;
        }

    },
    getUserSetting: async (userId) => {
        try {
            const userSettingData = await User.findOne({
                where: {
                    id: userId
                },
                attributes: ['email', 'phone', 'marketing']
            })
            return userSettingData
        } catch (err) {
            throw err;
        }
    },
    setMarketing: async (userId, boolean) => {
        try {
            let checked;
            if (boolean === true) {
                checked = 1;
            } else {
                checked = 0;
            }
            await User.update({
                marketing: checked
            }, {
                where: { id: userId }
            })
        } catch (err) {
            throw err;
        }
    },
    getUserPW: async (userId) => {
        try {
            const userPW = await User.findOne({
                where: {
                    id: userId
                },
                attributes: ['email', 'salt', 'password']
            })
            return userPW
        } catch (err) {
            throw err;
        }
    },
    changePassword: async (userId, salt, hashedPassword) => {
        try {
            await User.update({
                salt, password: hashedPassword
            }, {
                where: { id: userId }
            });
            return "비밀번호 변경 성공"
        } catch (err) {
            throw err;
        }

    },
    deleteAccount: async (userId) => {
        try {
            await User.destroy({
                where: {
                    id: userId
                }
            })
            return "계정 삭제 성공"
        } catch (err) {
            throw err;
        }
    }
}