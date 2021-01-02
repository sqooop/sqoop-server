const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const hashtagMethod = require('../method/hashtagMethod');


module.exports = {
    createHashtagList: async (jobTag, skillTag) => {
        if (!jobTag || !skillTag) {
            console.log('필요값 누락');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try {
            let hashtagList = new Array();
            for (let job = 0; job < jobTag.length; job++) {
                let jobData = { content: jobTag[job], isJob: 1 };
                hashtagList.push(jobData);
            }
            for (let skill = 0; skill < skillTag.length; skill++) {
                let skillData = { content: skillTag[skill], isJob: 0 };
                hashtagList.push(skillData);
            }
            return hashtagList;

        } catch (err) {
            throw err;
        }
    }

}