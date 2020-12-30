const cardService = require('../service/cardService');

module.exports = {
    createCard: async (req, res) => {
        const { number, question, ActivityId, content } = req.body;
        const newCard = await cardService.createCard(number, question, ActivityId, content, res);
        return newCard;
    }
}