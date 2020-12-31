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
  },
  getCards: async (ActivityId, res) => {
    if (!ActivityId) {
      console.log('필요값 누락');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {
      const cardArr = await cardMethod.getCards(ActivityId);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_CARD_SUCCESS, cardArr));
    } catch (err) {
      console.error(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.GET_CARD_FAIL));
    }
  },
  updateCard: async (number, question, ActivityId, content, res) => {
    if (!number || !question || !ActivityId || !content) {
      console.log('필요값 누락');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {
      const updatedCard = await cardMethod.updateCard(number, question, ActivityId, content);
      if(updatedCard == 0) { // 어차피 저장된 뒤에 수정이 되는 거라 이럴 케이스가 없긴하겠지만 일단..? 만들어놓음...ㅎㅎ
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.UPDATE_CARD_FAIL));
      }
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.UPDATE_CARD_SUCCESS, updatedCard));
    } catch (err) {
      console.error(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.UPDATE_CARD_FAIL));
    }
  }
}