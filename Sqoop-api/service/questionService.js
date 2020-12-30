const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const questionMethod = require('../method/questionMethod');

module.exports = {
  getQuestions: async (res) => {
    try {
      const questionArr = await questionMethod.getQuestions();
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_QUESTION_SUCCESS, questionArr));
    } catch (err) {
      console.error(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.GET_QUESTION_FAIL));
    }
  }
}