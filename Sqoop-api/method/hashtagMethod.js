const { Hashtag } = require('../models');

module.exports = {
    createHashtag: async (content, UserId, isJob) => {
        try {
            const newHashtag = await Hashtag.create({
                content,
                UserId,
                isJob
            });
            return newHashtag;
        } catch (err) {
            throw err;
        }
    }

}