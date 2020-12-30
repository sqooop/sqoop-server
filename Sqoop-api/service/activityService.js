const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const activityMethod = require('../method/activityMethod');

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
        jobTag,
        skillTag,
        UserId,
        imageUrl,
        fileUrl,
        star
      );
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.CREATE_ACTIVITY_SUCCESS, newActivity));
    } catch (err) {
      console.error(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CREATE_ACTIVITY_FAIL));
    }

  }
}