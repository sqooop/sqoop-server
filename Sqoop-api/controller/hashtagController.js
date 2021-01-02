const hashtagService = require('../service/hashtagService');

module.exports = {
    getHashtag: async (req, res) => {

        const userId = req.decoded.id;
        const hashtag = await hashtagService.getUserHashtag(userId, res);
        return hashtag;
    }
}