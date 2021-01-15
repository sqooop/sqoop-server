const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const cardMethod = require('../method/cardMethod');
const questionMethod = require('../method/questionMethod');



module.exports = {
  createCard: async (number, question, ActivityId, content, res) => {
    if (!number || !question || !ActivityId || !content) {
      console.log('필요값 누락');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {
      const existCard = await cardMethod.getCard(ActivityId, number);
      if(existCard) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.CREATE_CARD_FAIL));
      }
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
      const questions = await questionMethod.getQuestions();
      const questionCards = await cardMethod.getCards(ActivityId);

      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_CARD_SUCCESS, { questions, questionCards }));
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
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.UPDATE_CARD_SUCCESS, updatedCard));
    } catch (err) {
      console.error(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.UPDATE_CARD_FAIL));
    }
  }
}