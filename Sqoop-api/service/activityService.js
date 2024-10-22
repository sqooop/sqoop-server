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
    if (!ActivityId || !title || !startDate || !endDate || !jobTag || !skillTag) {
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
      if (fileUrl && !fileName) {
        const activity = await activityMethod.getActivity(ActivityId);
        fileName = activity.fileName;
      }
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


      if (questions && contents) {
        for (let number = 1; number <= 10; number++) {
          updatedCard = await cardMethod.updateCard(
            number,
            questions[number - 1],
            ActivityId,
            contents[number - 1]);
        }

      }

      if (!updatedActivity || !deletedHashtag) { // 근데 어차피 서버에러로 넘어가는 듯?(ActivityId값이 없는 것이 들어오면 자식인 해쉬태그를 먼저 생성하는 거니까 바로 서버에러 나서 ㅇ.ㅇ)
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

      if (startDate) {
        if (!endDate) {
          return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, { message: "끝 날짜를 정해주세요" }));
        }
      }
      if (endDate) {
        if (!startDate) {
          return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, { message: "시작 날짜를 정해주세요" }));
        }
      }

      let rawPreRangeActivity;
      if (!jobTag) {
        if (!skillTag) {
          rawPreRangeActivity = await activityMethod.getPreDateRangeActivity(userId, startDate, endDate); //D
          console.log(rawPreRangeActivity);
        } else {
          if (!startDate) {
            rawPreRangeActivity = await activityMethod.getPreSkillRangeActivity(userId, skillTag) //S
          } else {
            rawPreRangeActivity = await activityMethod.getPreDateSkillRangeActivity(userId, startDate, endDate, skillTag); //DS
          }
        }
      } else {
        if (!skillTag) {
          if (!startDate) {
            rawPreRangeActivity = await activityMethod.getPreJobRangeActivity(userId, jobTag) //J
          } else {
            rawPreRangeActivity = await activityMethod.getPreDateJobRangeActivity(userId, startDate, endDate, jobTag); //DJ
          }
        } else {
          if (!startDate) {
            rawPreRangeActivity = await activityMethod.getPreJobSkillRangeActivity(userId, jobTag, skillTag); //JS
          } else {
            rawPreRangeActivity = await activityMethod.getPreRangeActivity(userId, startDate, endDate, jobTag, skillTag); //DJS
          }
        }
      }


      const rangeActivityId = rawPreRangeActivity.map(activity => {
        return activity.id;
      })
      const rawRangeActivity = await activityMethod.getRangeActivity(rangeActivityId);

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
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_FILTERED_ACTIVITY_SUCCESS, rangeActivity));
    } catch (err) {
      console.log(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.GET_FILTERED_ACTIVITY_FAIL));
    }
  },
  getAllIncompleteActivity: async (UserId, res) => {
    try {
      const userActivity = await activityMethod.getAllActivity(UserId);
      const activityList = userActivity.map(data => data.get({ plain: true }));
      const activityIdList = activityList.map(data => data.id);
      const completeList = await cardMethod.getCompleteList(activityIdList);

      for (let complete of completeList) {
        const idx = activityIdList.indexOf(complete.ActivityId);
        activityIdList.splice(idx, 1);
      }

      const incompleteActivity = await activityMethod.getAllIncompleteActivity(activityIdList, UserId);

      let incompleteArr = incompleteActivity.map(data => data.get({ plain: true }))

      for (let activityOrder in incompleteArr) {
        let jobTag = new Array();
        let skillTag = new Array();
        let activity = incompleteArr[activityOrder];
        activity.Hashtags.map(hashtag => {
          if (hashtag.isJob === true) {
            jobTag.push(hashtag.content);
          } else {
            skillTag.push(hashtag.content);
          }
        })
        delete incompleteArr[activityOrder].Hashtags;
        incompleteArr[activityOrder].jobTag = jobTag;
        incompleteArr[activityOrder].skillTag = skillTag;
      }

      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_INCOMPLETE_ACTIVITY_SUCCESS, incompleteArr));
    } catch (err) {
      console.log(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.GET_INCOMPLETE_ACTIVITY_FAIL));
    }
  },
  deleteActivity: async (ActivityId, res) => {
    if (!ActivityId) {
      console.log('필요값 누락');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    try {
      const deletedActivity = await activityMethod.deleteActivity(ActivityId);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.DELETE_ACTIVITY_SUCCESS, deletedActivity));
    } catch (err) {
      console.error(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.DELETE_ACTIVITY_FAIL));
    }
  },
  getFullDate: async (UserId, res) => {
    try {
      const rawDate = await activityMethod.getActivityDate(UserId);
      let rawYearMonth = [];
      rawDate.forEach(date => {
        let startYear = date.startDate.slice(0, 4);
        let endYear = date.endDate.slice(0, 4);
        let startMonth = date.startDate.slice(4, 6);
        let endMonth = date.endDate.slice(4, 6);
        startYear *= 1;
        endYear *= 1;
        startMonth *= 1;
        endMonth *= 1;

        for (let year = startYear; year <= endYear; year++) {

          if (year === startYear && year === endYear) {
            for (let month = startMonth; month <= endMonth; month++) {
              rawYearMonth.push(year * 100 + month)
            }
          } else if (year === startYear) {
            for (let month = startMonth; month <= 12; month++) {
              rawYearMonth.push(year * 100 + month)
            }
          } else if (year === endYear) {
            for (let month = 1; month <= endMonth; month++) {
              rawYearMonth.push(year * 100 + month)
            }
          } else {
            for (let month = 1; month <= 12; month++) {
              rawYearMonth.push(year * 100 + month)
            }
          }
        }
      })
      rawYearMonth = Array.from(new Set(rawYearMonth));
      rawYearMonth.sort((a, b) => {
        return a - b;
      })
      const rawYear = rawYearMonth.map(date => {
        return date.toString().slice(0, 4);
      })

      let firstYear = rawYear[0]
      let lastYear = rawYear[rawYear.length - 1];
      firstYear *= 1;
      lastYear *= 1;
      let allMonthArray = [];
      for (let i = firstYear; i <= lastYear; i++) {
        for (let j = 1; j <= 12; j++) {
          let checkMonth = i * 100 + j;
          if (rawYearMonth.includes(checkMonth)) {
            allMonthArray.push(checkMonth);
          } else {
            allMonthArray.push([]);
          }
        }
      }
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_ALL_DATE_SUCCESS, { firstYear, lastYear, allMonthArray }));

    } catch (err) {
      console.log(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.GET_ALL_DATE_FAIL));
    }
  },
  getMonthlyActivity: async (userId, month, res) => {
    try {
      let endDateComparement = month * 100 + 1;
      let startDateComparement = month * 100 + 31;
      endDateComparement = endDateComparement.toString();
      startDateComparement = startDateComparement.toString();

      const rawMonthlyActivity = await activityMethod.getMonthlyActivity(userId, endDateComparement, startDateComparement);
      // 비교를 startDate < compareStartDate && endDate > compareEndDate

      let monthlyActivity = rawMonthlyActivity.map(data => data.get({ plain: true }))

      for (let activityOrder in monthlyActivity) {
        let jobTag = new Array();
        let skillTag = new Array();
        let activity = monthlyActivity[activityOrder];
        activity.Hashtags.map(hashtag => {
          if (hashtag.isJob === true) {
            jobTag.push(hashtag.content);
          } else {
            skillTag.push(hashtag.content);
          }
        })
        delete monthlyActivity[activityOrder].Hashtags;
        monthlyActivity[activityOrder].jobTag = jobTag;
        monthlyActivity[activityOrder].skillTag = skillTag;
      }
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_MONTHLY_ACTIVITY_SUCCESS, monthlyActivity));

    } catch (err) {
      console.log(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.GET_MONTHLY_ACTIVITY_FAIL));
    }
  }

}

