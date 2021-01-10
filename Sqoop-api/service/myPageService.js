const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const userMethod = require('../method/userMethod');

module.exports = {
  getMyPage: async (UserId, res) => {
    try {
      const myPageInfo = await userMethod.getMyPage(UserId);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_MY_PAGE_SUCCESS, myPageInfo));
    } catch (err) {
      console.error(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.GET_MY_PAGE_FAIL));
    }
  }
}