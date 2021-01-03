const {
    QuestionCard
} = require('../models');

module.exports = {
    createCard: async (number, question, ActivityId, content) => {
        try {
            const newCard = await QuestionCard.create({
                number,
                question,
                ActivityId,
                content
            });
            return newCard;
        } catch (err) {
            throw err;
        }
    },
    getCards: async (ActivityId) => {
        try {
            const questionCards = await QuestionCard.findAll({
                attributes: ['number', 'question', 'content'],
                where: {
                    ActivityId
                }
            });
            return questionCards;
        } catch (err) {
            throw err;
        }
    },
    updateCard: async (number, question, ActivityId, content) => { // 나중에 질문이 바뀔수 있으니?(랜덤 질문 번호) 일단 받는게 좋지않으려나 ㅇ.ㅇ
        try {
            const updatedCard = await QuestionCard.update({
                question,
                content
            }, {
                where: {
                    ActivityId,
                    number
                }
            });
            return "질문 카드 수정 완료";
        } catch (err) {
            throw err;
        }
    }

}