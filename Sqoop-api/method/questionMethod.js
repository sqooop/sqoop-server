const { Question } = require('../models');

module.exports = {
    getQuestions: async () => {
        try {
            const questionArr = await Question.findAll({
              attributes: ['number', 'content']
            });
            return questionArr;
        } catch (err) {
            throw err;
        }
    }

}