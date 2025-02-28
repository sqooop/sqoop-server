const jwt = require('../modules/jwt');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;
const ACCESS_TOKEN_EXPIRED = -4;

const authUtil = {
    checkToken: async (req, res, next) => {
        let token = req.headers.jwt;
        // let refreshToken = req.headers.refreshtoken;
        if (!token) {
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.EMPTY_TOKEN));
        }
        const user = await jwt.verify(token);

        // if (user === ACCESS_TOKEN_EXPIRED) {
        //     const refresh = await jwt.refresh(refreshToken);
        //     if (refresh !== TOKEN_EXPIRED) {
        //         const user = await jwt.verify(refresh);
        //         req.decoded = user;
        //         return next();
        //     }

        // }
        if (user === TOKEN_EXPIRED) {
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.EXPIRED_TOKEN));
        }
        if (user === TOKEN_INVALID) {
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.INVALID_TOKEN));
        }
        if (user.id === undefined) {
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.INVALID_TOKEN));
        }
        req.decoded = user;
        next();
    }
}
module.exports = authUtil;