const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const cardMethod = require('../method/cardMethod');


module.exports = {
  createCard: async (number, question, ActivityId, content, res) => {
    if (!number || !question || !ActivityId || !content) {
      console.log('필요값 누락');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {
      const newCard = await cardMethod.createCard(number, question, ActivityId, content);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.CREATE_CARD_SUCCESS, newCard));
    } catch (err) {
      console.error(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CREATE_CARD_FAIL));
    }
  }
}