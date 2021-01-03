const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const hashtagMethod = require('../method/hashtagMethod');
const activityMethod = require('../method/activityMethod');


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
    },
    getUserHashtag: async (userId, res) => {
        try {
            const rawActivity = await activityMethod.getAllActivity(userId);
            if (!rawActivity) {
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_ACTIVITY));
            }
            const allActivity = rawActivity.map(data => data.get({ plain: true }));
            let activityId = new Array();
            for (let activity of allActivity) {
                activityId.push(activity.id)
            }
            const rawHashtag = await hashtagMethod.getHashtag(activityId);
            if (!rawHashtag) {
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.GET_HASHTAG_FAIL));
            }
            let jobTag = new Array();
            let skillTag = new Array();
            for (hashtag of rawHashtag) {
                if (hashtag.isJob === 1) {
                    jobTag.push(hashtag.content);
                } else {
                    skillTag.push(hashtag.content);
                }
            }
            jobTag = Array.from(new Set(jobTag));
            skillTag = Array.from(new Set(skillTag));
            let hashtagList = {};
            hashtagList.jobTag = jobTag;
            hashtagList.skillTag = skillTag;

            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_HASHTAG_SUCCESS, hashtagList));

        } catch (err) {
            console.log(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.GET_HASHTAG_FAIL));
        }
    }

}