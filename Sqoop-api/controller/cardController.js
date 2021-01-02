const cardService = require('../service/cardService');

module.exports = {
    createCard: async (req, res) => {
        const { number, question, ActivityId, content } = req.body;
        const newCard = await cardService.createCard(number, question, ActivityId, content, res);
        return newCard;
    },
    getCards: async (req, res) => {
        const { ActivityId } = req.params;
        const questionCards = await cardService.getCards(ActivityId, res);
        return questionCards; 
    },
    updateCard: async (req, res) => {
        const { number, question, ActivityId, content } = req.body;
        const updatedCard = await cardService.updateCard(number, question, ActivityId, content, res);
        return updatedCard;
    }
}