const questionService = require('../service/questionService');

module.exports = {
    getQuestions: async (req, res) => {
        const questionArr = await questionService.getQuestions(res);
        return questionArr;
    }
}