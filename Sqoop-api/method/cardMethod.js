const { QuestionCard } = require('../models');

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
    }

}