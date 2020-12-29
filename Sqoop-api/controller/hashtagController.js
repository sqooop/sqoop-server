const hashtagService = require('../service/hashtagService');

module.exports = {
    createHashtag: async (req, res) => {
        const { content, isJob } = req.body;
        const userId = req.decoded.id;
        const newHashtag = await hashtagService.createHashtag(content, userId, isJob, res);
        return newHashtag;
    }
}