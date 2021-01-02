const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const activityMethod = require('../method/activityMethod');
const hashtagMethod = require('../method/hashtagMethod');
const cardMethod = require('../method/cardMethod');
const hashtagService = require('./hashtagService');
const activity = require('../models/activity');


module.exports = {
  createActivity: async (
    title,
    startDate,
    endDate,
    group,
    summary,
    jobTag,
    skillTag,
    imageUrl,
    fileUrl,
    UserId,
    res
  ) => {
    if (!title || !startDate || !endDate || !jobTag || !skillTag) {
      console.log('필요값 누락');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    if (!summary) {
      summary = "";
    }
    if (!group) {
      group = "";
    }
    try {
      let star = 0;

      const newActivity = await activityMethod.createActivity(
        title,
        startDate,
        endDate,
        group,
        summary,
        UserId,
        imageUrl,
        fileUrl,
        star
      );
      let hashtagList = await hashtagService.createHashtagList(jobTag, skillTag);

      const activityId = newActivity.id;
      hashtagList.map(hashtag => {
        return hashtag.ActivityId = activityId;
      })
      const newHashtag = await hashtagMethod.createHashtag(hashtagList);

      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.CREATE_ACTIVITY_SUCCESS, { newActivity, newHashtag }));
    } catch (err) {
      console.error(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CREATE_ACTIVITY_FAIL));
    }
  },
  likeActivity: async (ActivityId, res) => {
    if (!ActivityId) {
      console.log('필요값 누락');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    try {
      const likeActivity = await activityMethod.likeActivity(ActivityId);
      if (!likeActivity) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.LIKE_ACTIVITY_FAIL));
      }
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.LIKE_ACTIVITY_SUCCESS, likeActivity));
    } catch (err) {
      console.log(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.LIKE_ACTIVITY_FAIL));
    }


  },
  getActivity: async (ActivityId, res) => {
    if (!ActivityId) {
      console.log('필요값 누락');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {
      const selectedActivity = await activityMethod.getActivity(ActivityId);
      if (!selectedActivity) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.GET_ACTIVITY_FAIL));
      }
      // const usedHashtag = await hashtagMethod.getUsedHashtag(ActivityId);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_ACTIVITY_SUCCESS, selectedActivity));
    } catch (err) {
      console.error(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.GET_ACTIVITY_FAIL));
    }
  },
  getAllActivity: async (userId, res) => {
    try {
      const userActivity = await activityMethod.getAllActivity(userId);
      if (!userActivity) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_ACTIVITY));
      }
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_ALL_ACTIVITY_SUCCESS, userActivity));
    } catch (err) {
      console.log(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.GET_ALL_ACTIVITY_FAIL));
    }
  },
  getAllLikeActivity: async (userId, res) => {
    try {
      const likeActivity = await activityMethod.getAllLikeActivity(userId);
      if (!likeActivity) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_ACTIVITY));
      }
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_ALL_LIKE_ACTIVITY_SUCCESS, likeActivity));
    } catch (err) {
      console.log(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.GET_ALL_LIKE_ACTIVITY_FAIL));
    }
  },

}