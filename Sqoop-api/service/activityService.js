const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const activityMethod = require('../method/activityMethod');
const hashtagMethod = require('../method/hashtagMethod');
const hashtagService = require('./hashtagService');
const cardMethod = require('../method/cardMethod');



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
    fileName,
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
        fileName,
        star
      );
      let hashtagList = await hashtagService.createHashtagList(jobTag, skillTag);

      const activityId = newActivity.id;
      hashtagList.map(hashtag => {
        return hashtag.ActivityId = activityId;
      })
      const newHashtag = await hashtagMethod.createHashtag(hashtagList);

      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.CREATE_ACTIVITY_SUCCESS, {
        newActivity,
        newHashtag
      }));
    } catch (err) {
      console.error(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CREATE_ACTIVITY_FAIL));
    }
  },
  updateActivity: async (
    title,
    startDate,
    endDate,
    group,
    summary,
    jobTag,
    skillTag,
    imageUrl,
    fileUrl,
    fileName,
    ActivityId,
    questions,
    contents,
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
      const updatedActivity = await activityMethod.updateActivity(
        title,
        startDate,
        endDate,
        group,
        summary,
        imageUrl,
        fileUrl,
        fileName,
        ActivityId
      );

      const deletedHashtag = await hashtagMethod.deleteHashtag(ActivityId);
      let hashtagList = await hashtagService.createHashtagList(jobTag, skillTag);

      hashtagList.map(hashtag => {
        return hashtag.ActivityId = ActivityId;
      })
      const newHashtag = await hashtagMethod.createHashtag(hashtagList);

      let updatedCard;

      for (let number = 1; number <= 10; number++) {
        updatedCard = await cardMethod.updateCard(
          number,
          questions[number - 1],
          ActivityId,
          contents[number - 1]);
      }

      if (!updatedActivity || !deletedHashtag || !newHashtag || !updatedCard) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.UPDATE_ACTIVITY_FAIL));
      }
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.UPDATE_ACTIVITY_SUCCESS, updatedActivity));
    } catch (err) {
      console.error(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.UPDATE_ACTIVITY_FAIL));
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

      const jobTag = await hashtagMethod.getJobTag(ActivityId);
      const skillTag = await hashtagMethod.getSkillTag(ActivityId);

      const questionCards = await cardMethod.getCards(ActivityId);

      let isFinished;
      /* 
        0: 작성한 활동카드 X
        1: 작성한 활동카드가 있으나 10번까지 완성X
        2: 10번까지 모든 활동카드 작성O
      */
      if (questionCards.length == 10) {
        isFinished = 2;
      } else if (questionCards.length == 0) {
        isFinished = 0;
      } else {
        isFinished = 1;
      }

      if (isFinished == 2) {
        return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_ACTIVITY_SUCCESS, {
          selectedActivity,
          jobTag,
          skillTag,
          isFinished,
          questionCards
        }));
      }

      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_ACTIVITY_SUCCESS, {
        selectedActivity,
        jobTag,
        skillTag,
        isFinished
      }));
    } catch (err) {
      console.error(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.GET_ACTIVITY_FAIL));
    }
  },
  getAllActivity: async (userId, res) => {
    try {
      const rawUserActivity = await activityMethod.getAllActivity(userId);
      if (!rawUserActivity) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_ACTIVITY));
      }
      let userActivity = rawUserActivity.map(data => data.get({ plain: true }))

      for (let activityOrder in userActivity) {
        let jobTag = new Array();
        let skillTag = new Array();
        let activity = userActivity[activityOrder];
        activity.Hashtags.map(hashtag => {
          if (hashtag.isJob === true) {
            jobTag.push(hashtag.content);
          } else {
            skillTag.push(hashtag.content);
          }
        })
        delete userActivity[activityOrder].Hashtags;
        userActivity[activityOrder].jobTag = jobTag;
        userActivity[activityOrder].skillTag = skillTag;
      }
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_ALL_ACTIVITY_SUCCESS, userActivity));
    } catch (err) {
      console.log(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.GET_ALL_ACTIVITY_FAIL));
    }
  },
  getAllLikeActivity: async (userId, res) => {
    try {
      const rawUserLikeActivity = await activityMethod.getAllLikeActivity(userId);
      if (!rawUserLikeActivity) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_ACTIVITY));
      }
      let userLikeActivity = rawUserLikeActivity.map(data => data.get({ plain: true }))

      for (let activityOrder in userLikeActivity) {
        let jobTag = new Array();
        let skillTag = new Array();
        let activity = userLikeActivity[activityOrder];
        activity.Hashtags.map(hashtag => {
          if (hashtag.isJob === true) {
            jobTag.push(hashtag.content);
          } else {
            skillTag.push(hashtag.content);
          }
        })
        delete userLikeActivity[activityOrder].Hashtags;
        userLikeActivity[activityOrder].jobTag = jobTag;
        userLikeActivity[activityOrder].skillTag = skillTag;
      }
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_ALL_LIKE_ACTIVITY_SUCCESS, userLikeActivity));
    } catch (err) {
      console.log(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.GET_ALL_LIKE_ACTIVITY_FAIL));
    }
  },
  getRangeActivity: async (userId, startDate, endDate, jobTag, skillTag, res) => {
    try {

      if (!startDate || !endDate) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_DATE));
      }
      let rawPreRangeActivity;
      if (!jobTag) {
        if (!skillTag) {
          rawPreRangeActivity = await activityMethod.getPreDateRangeActivity(userId, startDate, endDate);
          console.log(rawPreRangeActivity);
        } else {
          rawPreRangeActivity = await activityMethod.getPreSkillRangeActivity(userId, startDate, endDate, skillTag);
        }
      } else {
        if (!skillTag) {
          rawPreRangeActivity = await activityMethod.getPreJobRangeActivity(userId, startDate, endDate, jobTag);
        } else {
          rawPreRangeActivity = await activityMethod.getPreRangeActivity(userId, startDate, endDate, jobTag, skillTag);
        }
      }


      let preRangeActivity = rawPreRangeActivity.map(data => data.get({ plain: true }))
      const rangeActivityId = preRangeActivity.map(activity => {
        return activity.id;
      })
      const rawRangeActivity = await activityMethod.getRangeActivity(rangeActivityId);
      if (!rawRangeActivity[0]) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_ACTIVITY));
      }
      let rangeActivity = rawRangeActivity.map(data => data.get({ plain: true }))
      for (let activityOrder in rangeActivity) {
        let jobTag = new Array();
        let skillTag = new Array();
        let activity = rangeActivity[activityOrder];
        activity.Hashtags.map(hashtag => {
          if (hashtag.isJob === true) {
            jobTag.push(hashtag.content);
          } else {
            skillTag.push(hashtag.content);
          }
        })
        delete rangeActivity[activityOrder].Hashtags;
        rangeActivity[activityOrder].jobTag = jobTag;
        rangeActivity[activityOrder].skillTag = skillTag;
      }
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_ALL_ACTIVITY_SUCCESS, rangeActivity));
    } catch (err) {
      console.log(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.GET_ALL_ACTIVITY_FAIL));
    }
  },

}