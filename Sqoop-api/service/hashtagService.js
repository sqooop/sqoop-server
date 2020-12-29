const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const hashtagMethod = require('../method/hashtagMethod');


module.exports = {
    createHashtag: async (content, UserId, isJob, res) => {
        if (!content) {
            console.log('필요값 누락');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try {
            let checkJob = 0;
            if (isJob) {
                checkJob = 1;
            }
            const createHashtag = await hashtagMethod.createHashtag(content, UserId, checkJob);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.CREATE_HASHTAG_SUCCESS, { content, UserId, isJob: checkJob }));
        } catch (err) {
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CREATE_HASHTAG_FAIL));
        }
    }

}