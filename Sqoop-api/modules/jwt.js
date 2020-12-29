const jwt = require('jsonwebtoken');
const { secretKey, options, refreshOptions } = require('../config/secretKey');
const TOKEN_EXPIRED = -3;
const ACCESS_TOKEN_EXPIRED = -4;
const TOKEN_INVALID = -2;

const { User } = require('../models');

module.exports = {
    sign: async (user) => {
        const payload = {
            id: user.id,
            name: user.userName
        }; // jwt로 넘어가는 정보를 지정하는 부분 (jwt.sign에서 지정)
        // const refresh_payload = {
        //     id: user.id
        // }
        const result = {
            accessToken: jwt.sign(payload, secretKey, options),
            // refreshToken: jwt.sign(refresh_payload, secretKey, refreshOptions)
        };
        return result;
    },
    verify: async (token) => {
        let decoded;
        try {
            decoded = jwt.verify(token, secretKey);
        } catch (err) {
            if (err.message === 'jwt expired') {
                console.log('expired token check refreshToken');
                // const check_rT = jwt.verify()
                return ACCESS_TOKEN_EXPIRED;
            } else if (err.message === 'invalid token') {
                console.log('invalid token');
                console.log(TOKEN_INVALID);
                return TOKEN_INVALID;
            } else {
                console.log("invalid token");
                return TOKEN_INVALID;
            }
        }
        return decoded;
    },
    // refresh: async (refreshToken) => {
    //     //refreshToken도 함께 headers로 넣어 확인
    //     let refresh_id;
    //     try {
    //         refresh_id = jwt.verify(refreshToken, secretKey);

    //         const user = await User.findOne({
    //             where: {
    //                 id: refresh_id.id
    //             },
    //             attributes: ['id', 'userName', 'refreshToken']

    //         })
    //         if (user.refreshToken === refreshToken) {
    //             const payload = {
    //                 id: user.id,
    //                 name: user.userName
    //             };
    //             const accessToken = jwt.sign(payload, secretKey, options)
    //             return accessToken;
    //         }

    //     } catch (err) {
    //         if (err.message === 'jwt expired') {
    //             console.log('expired token');
    //             return TOKEN_EXPIRED;
    //         } else if (err.message === 'invalid token') {
    //             console.log('invalid token');
    //             console.log(TOKEN_INVALID);
    //             return TOKEN_INVALID;
    //         } else {
    //             console.log(err);
    //             return TOKEN_INVALID;
    //         }
    //     }

    // }
}